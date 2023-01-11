import express from 'express';
import { ROLES_LIST } from '../config/roles_list.js';
import { verifyRoles } from '../middleware/VerifyRoles.middleware.js';
import {
  createNewEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  getEmployee,
} from '../controller/Employee.controller.js';

const EmployeeRouter = express.Router();

EmployeeRouter.route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

EmployeeRouter.route('/:id').get(getEmployee);

export default EmployeeRouter;
