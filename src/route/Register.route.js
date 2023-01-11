import express from 'express';
import path from 'path';
import multer from 'multer';
import { checkImageMiddleware } from '../utils/CheckImageMiddleware.js';
import { handleNewUser } from '../controller/Register.controller.js';

const RegisterRouter = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

RegisterRouter.route('/').post(
  upload.single('userProfile'),
  checkImageMiddleware,
  handleNewUser
);

export default RegisterRouter;
