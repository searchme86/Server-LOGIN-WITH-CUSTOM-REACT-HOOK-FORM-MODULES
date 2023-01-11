import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (filePath, saveTofolder) => {
  return cloudinary.uploader
    .upload(filePath, { folder: saveTofolder })
    .then((data) => {
      return { SavedImageUrl: data.url, SavedImagePublic_id: data.public_id };
    })
    .catch((error) => {
      console.log('이미지를 업로드 중 에러가 발생했습니다', error);
    });
};

export const getMyCloudinaryImageId = async (folderName) => {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder : ${folderName}`)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    return publicIds;
  } catch (error) {
    console.log('getMyCloudinaryImageId 에러', error);
  }
};

export const removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.log('파일 삭제 중 에러가 발생했습니다', error);
    }
    if (result) {
      console.log(`${public_id}의 이미지가 삭제됐습니다, ${result}`);
    }
  });
};
