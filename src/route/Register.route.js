import express from 'express';
import { checkImageMiddleware } from '../utils/CheckImageMiddleware.js';
import { handleNewUser } from '../controller/Register.controller.js';
import { upload } from '../utils/Multer.js';

const RegisterRouter = express.Router();

RegisterRouter.route('/').post(
  upload.single('userProfile'),
  checkImageMiddleware,
  handleNewUser
);

export default RegisterRouter;
