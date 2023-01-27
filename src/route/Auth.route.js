import express from 'express';

import { createUserInfo } from '../controller/Auth.controller.js';

const AuthRouter = express.Router();

AuthRouter.route('/create').post(createUserInfo);

export default AuthRouter;
