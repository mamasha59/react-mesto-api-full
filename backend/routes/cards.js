/* eslint-disable linebreak-style */
const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  // eslint-disable-next-line no-else-return
  } else {
    throw new Error('URL validation err');
  }
};

router.get('/cards', getCards);

router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(method),
    }),
  }), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), putLike);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteLike);

module.exports = router;
