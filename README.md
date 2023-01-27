## 📝 프로젝트 README.md

|      파일명       |           내용           | 경로  |
| :---------------: | :----------------------: | :---: |
|     README.md     |  프로젝트 소개 및 이해   | root  |
|     Codes.md      |  프로젝트 코드 및 폴더   | /docs |
| Issue-to-learn.md | 이슈 및 해결사항, 배운점 | /docs |
|  Constraints.md   |     프로젝트의 한계      | /docs |

## ⌨️ 프로젝트 개요

|                                                    카테고리                                                    |                         내용                          |
| :------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------: |
|                                                   코드 Role                                                    |                        백엔드                         |
|                                                   코드 내용                                                    | Authentication(로그인) <br/> Authorization(권한) 체크 |
|                                               프로젝트 작업일정                                                |                  11.16 ~ 12.30. 2022                  |
|                                               프로젝트 리펙토링                                                |                   01.02.2022 ~ 현재                   |
|                                              프로젝트 코드 기여도                                              |                          30%                          |
| [클라이언트](https://github.com/searchme86/Client-LOGIN-WITH-CUSTOM-REACT-HOOK-FORM-MODULES '클라이언트 코드') |                       TS React                        |
|                                                     백엔드                                                     |                       JS Nodejs                       |

## 👋🏻 프로젝트 제목

### [React Hook Form](https://react-hook-form.com/)과 [Zod](https://github.com/colinhacks/zod 'zod')가 기본 적용된, 폼 엘리먼트(form, input) 구현과 활용(로그인)

## ❕프로젝트 시작하게 된 계기

- 💪🏻 [이전 포트폴리오,fleamarketagora](https://github.com/searchme86/App_Final_Deployed '이전 포트폴리오,fleamarketagora')의 백엔드 코드를 리펙토링하고 개선을 통해, 스스로 기술적 성장을 목표함

  - #### 🙏 개선 목표

    |                                       AS-IS                                       |                                                          개선 이유                                                          |                                                    TO-BE                                                    |
    | :-------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
    | Token 상태 및 관리 <br/> - refresh 되지 않음 <br/> - LocalStorage에 저장하여 관리 |                             - Token은 refresh 해야함 <br/> - LocalStorage에 <br/> 저장하면 안됨                             | - Token에 <br/> refresh 특성부여 <br/> - 서버에서 생성해 토큰 갱신 <br/> - Persistant login 으로 <br/> 전환 |
    |                 npm, 'react-file-base64'으로 <br/> 이미지 업로드                  | 폼 상태 초기화(reset) 할 때, <br/> 모듈 'react-file-base64'에 <br/> 이미지 값(base64)만 남아있어 <br/> 이를 처리하기 어려움 |                                    이미지 업로드 <br/> 과정 하나씩 구현                                     |

## 😎 이전 프로젝트 대비 변경된 기능

|         기능         |           파일명           |                                                                         내용                                                                         |
| :------------------: | :------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| 이미지 처리 미들웨어 |  CheckImageMiddleware.js   |                                        클라이언트에서 전달된 formData에서<br/> 이미지가 있는 지 포함여부 확인                                        |
|                      |    Cloudinary.helper.js    |                                    클라이언트에서 받은 이미지를<br/> Cloudinary로 업로드 하거나<br/> 요청 및 삭제                                    |
|                      |         Multer.js          |                                                       클라이언트에서 전달한<br/> 이미지를 처리                                                       |
|    Refresh Token     |     Auth.controller.js     |                                                   유저 Auth를 생성하면서,<br/> Access Token을 생성                                                   |
|                      | RefreshToken.controller.js | 클라이언트에서<br/> 새로운 Access Token을 요청하면<br/> JWT 미들웨어를 통해<br/> 유저의 Access Token 여부를 체크하고<br/> 새로운 Access Token을 발급 |
