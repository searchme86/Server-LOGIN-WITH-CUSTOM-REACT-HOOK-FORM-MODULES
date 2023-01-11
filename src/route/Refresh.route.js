import express from 'express';
import { handleRefreshToken } from '../controller/RefreshToken.controller.js';

const RefreshRouter = express.Router();

RefreshRouter.route('/').get(handleRefreshToken);

export default RefreshRouter;
