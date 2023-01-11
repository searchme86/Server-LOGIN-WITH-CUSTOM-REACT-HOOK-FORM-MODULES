export const notFound = (req, res) => {
  return res.status(401).send('Route does not exist');
};
