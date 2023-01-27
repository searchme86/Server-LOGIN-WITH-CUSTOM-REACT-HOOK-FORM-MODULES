import User from '../model/User.model.js';
import bcrypt from 'bcryptjs';
import { uploadToCloudinary } from '../utils/Cloudinary.helper.js';

export const handleNewUser = async (req, res) => {
  try {
    const {
      body: { userNickName, userEmail, userPassword },
      file: { path },
    } = req;

    const duplicate = await User.findOne({ userNickName: userNickName }).exec();

    if (duplicate)
      return res.status(409).json({
        message: `이미 등록된 정보와 일치합니다. 새로운 정보를 사용해주세요`,
      });

    const ImageResult = await uploadToCloudinary(path, 'userImage');

    const hashedPwd = await bcrypt.hash(userPassword, 10);

    const result = await User.create({
      userImagePublicId: ImageResult.SavedImagePublic_id,
      userImageUrl: ImageResult.SavedImageUrl,
      userNickName,
      userPassword: hashedPwd,
      userEmail,
    });

    return res
      .status(201)
      .json({ success: `${userNickName}님 등록이 완료됐습니다.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
