import express from 'express';

import {
  createUserInfo,
  checkUserExist,
} from '../controller/Auth.controller.js';

const AuthRouter = express.Router();

AuthRouter.route('/check').post(checkUserExist);
AuthRouter.route('/create').post(createUserInfo);

export default AuthRouter;
