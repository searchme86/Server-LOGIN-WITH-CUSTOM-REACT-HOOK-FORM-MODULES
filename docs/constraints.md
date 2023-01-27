## 🐛 버그 및 한계

- 😟 프로젝트 코드 기여도 40%

  - 😩 로그인 관련 튜토리얼의 백엔드 코드를 베이스로 코드 구현

    - 💡 [Node.js Full Course for Beginners](https://www.youtube.com/watch?v=f2EqECiTBL8&t=0s 'Node.js Full Course for Beginners')

  - 💪🏻 직접 변경 한 부분

    - 1. 코드를 ES6로 변경 및 구조 변경(route, controller,init,db,)
    - 2. MongoDB 설정을 위해 코드 추가
    - 3. 라우터와 컨트롤러 연결되는 코드 형태 변경(체이닝)
    - 4. multer & Cloudinary 이미지 처리 핸들러

    ***

    - 1. 코드를 ES6로 변경

      - > import ... from ...

      - ES6코드 형태로 작성할 수 있도록 'babel'를 사용 및 관련 설정으로 변경

      ```js
      "devDependencies": {
        "@babel/core": "^7.20.5",
        "@babel/node": "^7.20.5",
        "@babel/preset-env": "^7.20.2",
        "morgan": "^1.10.0",
        "nodemon": "^2.0.20"
      },
      ...중략...
      "type": "module"

      ```

    - 2. MongoDB 설정을 위해 코드 추가

      - MongoDB가 연결 실패일 경우, 콜백함수 추가

        ```js
        export const connectToDB = (cb) => {
          try {
            mongoose.connect(process.env.MONGO_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });

            cb();
            console.log('Db connect successful');
          } catch (error) {
            cb(error);
            console.log('Mongoose Connection Error!', error);
          }
        };

        ...중략...

        import { connectToDB } from './db.js';

        connectToDB((err) => {
          if (!err) {
            app.listen(PORT, handleListening);
          }
        });

        ```

        - 3. 라우터와 컨트롤러 연결되는 코드 형태 변경

          - Rest 액션에 따라 체이닝 가능한 코드

            - 체이닝 구조

              - 예시

                ```js
                UserRouter.route('/')
                  .get(verifyRoles(ROLES_LIST.User), getAllUsers)
                  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);
                ```

          ```js
          import express from 'express';
          import { createUserInfo } from '../controller/Auth.controller.js';

          const AuthRouter = express.Router();
          AuthRouter.route('/create').post(createUserInfo);

          export default AuthRouter;
          ```

          - AuthRouter : express.Router()를 통해 라우터 정의
          - AuthRouter.route('/create').post(createUserInfo)
            - route : 라우트 경로를 입력
            - post: post 액션
            - createUserInfo : 해당 라우터에 연결되는 컨트롤러

- 🗝️ Refresh Token 구현 못함

- 🖼️ Cloudinary & Multer
  - 하나의 이미지만 처리 가능
  - 이미지 처리에 대한 에러 핸들러 구현 못함
  - 이미지 요청 이외에 다른 핸들러를 프로젝트에서 사용하지 않음
