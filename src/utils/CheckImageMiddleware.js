export const checkImageMiddleware = (req, res, next) => {
  if (!req.file) {
    res
      .status(401)
      .json({ message: '프로필에 등록할 이미지가 존재하지 않습니다.' });
  }
  next();
};
