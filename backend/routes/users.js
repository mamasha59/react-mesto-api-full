const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Это не похоже на URL');
};

const {
  getAllUsers,
  getUser,
  getOwner,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getOwner);
router.get('/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }).unknown(true),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    about: Joi.string().required().min(1),
  }).unknown(true),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
