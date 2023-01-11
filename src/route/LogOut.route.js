import express from 'express';
import { handleLogout } from '../controller/LogOut.controller.js';

const LogOutRouter = express.Router();

LogOutRouter.route('/').get(handleLogout);

export default LogOutRouter;
