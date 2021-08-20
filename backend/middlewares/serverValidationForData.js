const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validationSignin = celebrate({ // --- валидация при входе
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validationSignUp = celebrate({ // ---валидация при регисттрации
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
    ),
  }),
});

module.exports.validationUserId = celebrate({ // ----валидация при выборе пользователя по айди
  params: Joi.object().keys({
    userId: Joi.string().hex().max(24),
  }),
});
module.exports.validationCardId = celebrate({ // ----валидация функционала карточек по айди
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
module.exports.avatarValidation = celebrate({ // ---валидация при обновлении автара
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
          return value;
        }
        return helpers.message('Неправильный формат ссылки');
      }),
  }),
});

module.exports.usrMeValidation = celebrate({ // -- валидация при обвониления профиля (about,me)
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.getCardValidation = celebrate({ // ---валидация name - link при создании картоки
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
  }),
});
