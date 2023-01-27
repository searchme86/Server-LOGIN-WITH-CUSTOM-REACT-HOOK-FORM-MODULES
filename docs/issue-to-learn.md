## 😭 배운 점

- 🔌 클라이언트와 백엔드 관계

  - 클라이언트에서 요청(req)을 백엔드에서 응답(response)으로 전달되는 코드 흐름

- ⌨️ NodeJs(express.js) 코드 작성 원칙

  - server.js/app.js

    - 코드는 위에서 부터 아래로 순서대로 작동되기 때문에, 코드 순서를 의미에 맞게 작성해야 함

      - Auth가 필요한 라우터(예:user 라우터)를 정의 할 때는, Auth 미들웨어 코드 아래에 작성해야, Auth 미들웨어의 효과를 사용할 수 있음

    - 하나의 요청(req)에는 반드시 하나의 응답(res)만 하도록 코드 작성
      - 'return' 키워드를 통해 여러개의 응답(res)이 안되도록 함
      ```js
      return res.status(401).json({
        message: `닉네임, ${LoginUserNickname} 유저가 존재하지 않습니다.`,
      });
      ```

- 🔭 백엔드(Express.js) 프로젝트 구성을 이해

  |       대상       |                 역할                 |
  | :--------------: | :----------------------------------: |
  | server.js/app.js |  클라이언트 요청 및 프로젝트 진입점  |
  |      route       | (클라이언트 요청에 따라) 코드를 분기 |
  |    middleWare    |  (클라이언트 요청을) 중간에서 처리   |
  |    controller    |       (클라이언트 요청을) 처리       |

- 📒 NodeJs 개념

  - 미들웨어의 개념을 이해

    - 요청(req)과 결과(res) 사이에서 전달되는 값을 처리하는 함수
      | 요청(req) | 미들웨어(middleWare) | 응답(res)|
      | :--------------: | :----------------------------------: |:----------------------------------: |
      | 클라이언트/프로그램의 요청 | 요청에 값을 추가/변경/삭제 등 중간에서 처리 |(처리된 요청의) 결과|

    - 프로젝트에서 사용된 미들웨어

      - Multer.js
      - Cloudinary.helper.js
      - CheckImageMiddleware.js
      - VerifyJWT.middleware.js

    - next 함수의 개념

  - Cors 개념

  - Multer

    - 클라이언트에서 전달한 FormData와 Field Error

  - Cloudinary

    - Cloudinary로 파일 처리 핸들러 작성

- 🔑 Authentication(로그인) & Authorization(권한)

  - Authentication(로그인)

    - jsonwebtoken, bcryptjs를 통한 유저 로그인을 학습

  - Authorization(권한)
    - 유저 정보를 체크하고 특정 정보에 따라 권한을 부여하는 미들웨어 학습
