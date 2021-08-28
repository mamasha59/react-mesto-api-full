const jwt = require('jsonwebtoken');
const NotValidJwtError = require('../errors/not-valid-jwt-error');

module.exports = (req, res, next) => {
  const auth = req.headers.cookie;
  if (!auth) {
    throw new NotValidJwtError('Необходима авторизация');
  }
  const token = auth.replace('jwt=', '');
  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NotValidJwtError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
