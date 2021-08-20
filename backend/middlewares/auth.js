const jwt = require('jsonwebtoken');
const BadAutorization = require('../errors/bad-autorization');
const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new BadAutorization('Необходима автризация'); // ---- ошибка 401
  } else {
    const token = req.cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new BadAutorization('Необходима автризация'); // ---- ошибка 401
    }
    req.user = payload; // записываем пейлоуд в объект запроса

    next(); // пропускаем запрос дальше
  }
};
