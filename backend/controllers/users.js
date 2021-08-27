/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found');
const BadAutorization = require('../errors/bad-autorization');
const SameEmailEror = require('../errors/errorSameEmail');
const { JWT_SECRET } = require('../utils/constants');

module.exports.createUser = (req, res, next) => { //  --- создает пользователя/регистрация
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    next(new BadAutorization('Пароль или почта некорректны'));
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Что-то не так с запросом')); // ---- ошибка 400
      } else if (err.name === 'MongoError' || err.code === 'E11000') {
        next(new SameEmailEror('Такой емейл уже зарегистрирован'));
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
      } else if (err.message === 'NotFound') {
        next(new NotFound('Ресурс не найден.')); // ---- ошибка 404
      }
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(new Error('NotFound'))
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
      } else if (err.message === 'NotFound') {
        next(new NotFound('Ресурс не найден.')); // ---- ошибка 404
      }
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  //  ---обновление имя и о себе
  const { name, about } = req.body;
  // console.log(name,about)
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
      } else if (err.message === 'NotFound') {
        next(new NotFound('Ресурс не найден.')); // ---- ошибка 404
      }
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  //  ---обновление аватара
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id,
    { avatar },
    { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Что-то не так с запросом')); // ---- ошибка 400
      } else if (err.message === 'NotFound') {
        next(new NotFound('Ресурс не найден')); // ---- ошибка 404
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => { // --- авторизация
  const { email, password } = req.body;
  //--
  return User.findUserByCredentials(email, password)
    .then((user) => {
      bcrypt
      .compare(password, userIsExist.password)
      .then((matched) => {
        if (!matched) {
          next(new NotFound('Ресурс не найден'));
        }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
      .cookie('userToken', token, {
        maxAge: 360000000,
        httpOnly: true,
        sameSite: true,
      })
      .send({ _id: userIsExist._id });
    })
    .catch(() => {
      const err = new Error('Необходима авторизация');
      err.statusCode = 401;
      next(err);
    });
})
}
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(new NotFound('Пользователь с таким ID не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
