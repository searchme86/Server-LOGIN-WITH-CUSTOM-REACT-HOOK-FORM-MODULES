import User from '../model/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { getMyCloudinaryImageId } from '../utils/Cloudinary.helper.js';

dotenv.config();

export const checkUserExist = async (req, res) => {
  const {
    body: { LoginUserNickname, LoginUserPassword },
  } = req;

  try {
    const foundUser = await User.findOne({
      userNickName: LoginUserNickname,
    }).exec();

    //Unauthorized
    if (!foundUser)
      return res.status(401).json({
        message: `닉네임,${LoginUserNickname}는 존재하지 않습니다.`,
      });

    // evaluate password
    const match = await bcrypt.compare(
      LoginUserPassword,
      foundUser.userPassword
    );

    if (!match)
      return res.status(401).json({
        message: '비밀번호를 확인해주세요',
      });
  } catch (error) {
    console.log('checkUserExist 에러발생', error);
  }
};

export const createUserInfo = async (req, res) => {
  try {
    const {
      body: { LoginUserNickname, LoginUserPassword },
    } = req;

    const foundUser = await User.findOne({
      userNickName: LoginUserNickname,
    }).exec();

    //Unauthorized
    if (!foundUser)
      return res.status(401).json({
        message: `닉네임,${LoginUserNickname}유저가 존재하지 않습니다.`,
      });

    // evaluate password
    const match = await bcrypt.compare(
      LoginUserPassword,
      foundUser.userPassword
    );
    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      const userProfileImage = await getMyCloudinaryImageId('userImage');
      // console.log('userProfileImage', userProfileImage);

      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            userNickName: foundUser.userNickName,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
      );
      const refreshToken = jwt.sign(
        { userNickName: foundUser.userNickName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      // console.log(result);
      // console.log(roles);

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      // res.json({ roles, accessToken });
      res.json({ LoginUserNickname, userProfileImage, roles, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
};
