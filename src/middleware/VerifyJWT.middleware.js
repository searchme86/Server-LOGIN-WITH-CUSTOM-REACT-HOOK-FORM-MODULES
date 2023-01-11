import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // 이해한것 :
  // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Bearer가 없어서 못들어가용 ㅋ' });
  const token = authHeader.split(' ')[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
