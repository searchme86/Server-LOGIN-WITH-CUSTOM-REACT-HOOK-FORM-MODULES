import express from 'express';
import { handleRefreshToken } from '../controller/RefreshToken.controller.js';

const RootRouter = express.Router();

RootRouter.route('/').get(handleRefreshToken);

export default RootRouter;
