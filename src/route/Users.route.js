import express from 'express';
import { ROLES_LIST } from '../config/roles_list.js';
import { verifyRoles } from '../middleware/VerifyRoles.middleware.js';
import {
  deleteUser,
  getAllUsers,
  getUser,
} from '../controller/Users.controller.js';

const UserRouter = express.Router();

UserRouter.route('/')
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

UserRouter.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUser);

export default UserRouter;
