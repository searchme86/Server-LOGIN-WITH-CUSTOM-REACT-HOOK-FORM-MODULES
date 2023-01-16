import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { verifyJWT } from './middleware/VerifyJWT.middleware.js';
import { credentials } from './middleware/Credentials.middleware.js';
import { corsOptions } from './config/corsOptions.js';

import { ErrorHandlerMiddleware } from './middleware/errorHandler.js';

import RegisterRouter from './route/Register.route.js';
import AuthRouter from './route/Auth.route.js';
import RefreshRouter from './route/Refresh.route.js';
import LogOutRouter from './route/LogOut.route.js';
import EmployeeRouter from './route/Employee.route.js';
import UserRouter from './route/Users.route.js';

const app = express();

dotenv.config();

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use('/register', RegisterRouter);
app.use('/auth', AuthRouter);
app.use('/refresh', RefreshRouter);
app.use('/logout', LogOutRouter);

app.use(verifyJWT);
app.use('/employees', EmployeeRouter);
app.use('/users', UserRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(ErrorHandlerMiddleware);

export default app;
