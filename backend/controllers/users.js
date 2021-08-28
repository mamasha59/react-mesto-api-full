const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');
const AlreadyExistError = require('../errors/already-exist-error');
const NotValidJwtError = require('../errors/not-valid-jwt-error');
const ValidationError = require('../errors/validation-error');

module.exports.createUser = async function (req, res, next) {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const UserAlreadyExists = await User.findOne({ email });
    if (UserAlreadyExists) {
      throw new AlreadyExistError('Пользователь с таким email уже существует');
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      throw new NotValidJwtError('Неправильная почта или пароль');
    }
    const matchedPassword = await bcrypt.compareSync(password, user.password);
    if (!matchedPassword) {
      throw new NotValidJwtError('Неправильная почта или пароль');
    }
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
    })
      .end();
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    next(error);
  }
};

module.exports.getOwner = async function (req, res, next) {
  try {
    const owner = await User.findById(req.user._id);
    if (owner === null) {
      throw new NotFoundErr('Запрашиваемый пользователь не найден');
    }
    res.send({ owner });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async function (req, res, next) {
  try {
    if (req.params.userId.length < 24) {
      throw new ValidationError('Переданы некорректные данные');
    }
    const user = await User.findById(req.params.userId);
    if (user === null) {
      throw new NotFoundErr('Запрашиваемый пользователь не найден');
    }
    res.send({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProfile = async function (req, res, next) {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id,
      { name, about },
      { new: true, runValidators: true });
    if (user === null) {
      throw new NotFoundErr('Запрашиваемый пользователь не найден');
    }
    res.send({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAvatar = async function (req, res, next) {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id,
      { avatar },
      { new: true, runValidators: true });
    res.send({ user });
  } catch (error) {
    next(error);
  }
};
