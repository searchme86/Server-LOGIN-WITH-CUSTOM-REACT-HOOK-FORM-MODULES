### 🔬 코드 흐름

### 📦 폴더구조 및 코드

- 프로젝트 전체 코드
- 이미지 미들웨어
  - Cloudinary

---

### 🔬 코드 흐름

### 📦 폴더구조 및 코드

### 프로젝트 전체 코드

```
📦src
 ┣ 📂config
 ┣ 📂controller
 ┣ 📂middleware
 ┣ 📂model
 ┣ 📂route
 ┣ 📂uploads
 ┣ 📂utils
 ┣ 📜db.js
 ┣ 📜env.js
 ┣ 📜init.js
 ┗ 📜server.js
```

|   폴더명   |                                         내용                                          |                 의존                 |
| :--------: | :-----------------------------------------------------------------------------------: | :----------------------------------: |
|   config   |                [미들웨어] cors 처리 및<br/> 유저 role에 따른 권한 체크                |                                      |
| controller |                        프로젝트 코드 실제 처리,<br/> 컨트롤러                         |                                      |
| middleware |                      권한체크, 에러 핸들러,<br/> JWT 체크 핸들러                      |                                      |
|   route    |                                    프로젝트 라우터                                    |                                      |
|  uploads   |                            Multer로 이미지가 저장되는 폴더                            |              Multer.js               |
|   utils    |                   Multer,<br/> Cloudinary,<br/> 이미지 체크 핸들러                    | Multer.js,<br/> Cloudinary.helper.js |
|   db.js    |                                     MongoDB 연결                                      |               MongoDB                |
|   env.js   |                            프로젝트 환경변수를 모듈로 사용                            |                                      |
|  init.js   | 백엔드 첫 진입점,<br/> db.js을 통해 MongoDB를 연결하고,<br/>server.js를 호출하는 역할 |        db.js,<br/> server.js         |
| server.js  |                              express 코드가 작성되는 곳                               |              모든 코드               |

### 이미지 미들웨어 - Cloudinary

```js
// Register.controller.js
  const {
      body: { userNickName, userEmail, userPassword },
      file: { path },
    } = req;

 const ImageResult = await uploadToCloudinary(path, 'userImage');


// Cloudinary.helper.js
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



@param : filePath: formData로 전달되는 이미지의 path  saveTofolder: 어떤 폴더(명)로 저장될 것인가
// Cloudinary로 파일 업로드 핸들러
export const uploadToCloudinary = (filePath, saveTofolder) => {
  return cloudinary.uploader
  // saveTofolder로 들어온 인자값으로 폴더명이 확정됨
    .upload(filePath, { folder: saveTofolder })
    .then((data) => {
      // promise를 통해 결과를 반환받음
      // @returns : 이미지가 저장된 Cloudinary의 URL, 이미지의 public_id
      return { SavedImageUrl: data.url, SavedImagePublic_id: data.public_id };
    })
    .catch((error) => {
      console.log('이미지를 업로드 중 에러가 발생했습니다', error);
    });
};

@param : folderName: 이미지가 저장된 cloudinary 폴더명
// Cloudinary에 저장된 이미지를 호출하는 핸들러
export const getMyCloudinaryImageId = async (folderName) => {
  try {
    const { resources } = await cloudinary.search
      // 해당 폴더에서
      .expression(`folder : ${folderName}`)
      // public_id 로 정렬
      .sort_by('public_id', 'desc')
      // 최대 30개
      .max_results(30)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    return publicIds;
  } catch (error) {
    console.log('getMyCloudinaryImageId 에러', error);
  }
};

@param : public_id: 삭제하려는 이미지의 public_id를 전달함
// Cloudinary에 저장된 이미지를 호출하는 핸들러
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
```
