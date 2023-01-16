import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: '헤더에 Bearer token이 없어서 접근이 불가능합니다.',
    });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
