import User from '../model/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { getMyCloudinaryImageId } from '../utils/Cloudinary.helper.js';

dotenv.config();

export const createUserInfo = async (req, res) => {
  try {
    const {
      body: { LoginUserNickname, LoginUserPassword },
    } = req;

    const foundUser = await User.findOne({
      userNickName: LoginUserNickname,
    }).exec();

    if (!foundUser)
      return res.status(401).json({
        message: `닉네임, ${LoginUserNickname} 유저가 존재하지 않습니다.`,
      });

    const match = await bcrypt.compare(
      LoginUserPassword,
      foundUser.userPassword
    );

    if (!match)
      return res.status(401).json({
        message: `비밀번호가 일치하지 않습니다.`,
      });

    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      const userProfileImage = await getMyCloudinaryImageId('userImage');

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

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ LoginUserNickname, userProfileImage, roles, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log('유저의 정보를 생성하는 중 에러가 발생했습니다.', error);
  }
};
