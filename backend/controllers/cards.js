const Card = require('../models/card.js');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found');
const CannotDelete = require('../errors/error-prohibitten');

module.exports.createCard = (req, res, next) => { //  ---создание карточки
  const { name, link } = req.body;
  const owner = req.user.id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
      }
      next(err);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => { // --- получение всех карточек
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.send({ message: 'карточки не найдены' });
        return;
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => (Card.findByIdAndUpdate( // ----лайк карточки
  req.params.cardId,
  { $addToSet: { likes: req.user.id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(new Error('NotFound'))
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
    } else if (err.message === 'NotFound') {
      next(new NotFound('Ресурс не найден.')); // ---- ошибка 404
    }
  })
  .catch(next)
);

module.exports.dislikeCard = (req, res, next) => (Card.findByIdAndUpdate( //  ---удалени лайка
  req.params.cardId,
  { $pull: { likes: req.user.id } }, // убрать _id из массива
  { new: true },
)
  .orFail(new Error('NotFound'))
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Что-то не так с запросом.')); // ---- ошибка 400
    } else if (err.message === 'NotFound') {
      next(new NotFound('Ресурс не найден.')); // ---- ошибка 404
    }
  })
  .catch(next)
);

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId) // ---ищем краточку
    .orFail(() => new NotFound('Карточка с таким id не найдена')) // ---ошибка 404 не найдено
    .then((card) => {
      if (card.owner.toString() !== req.user.id.toString()) { // ----проверяем своя ли это карточка
        next(new CannotDelete('Нельзя удалить чужую карточку')); // --- ошибка 403
      } else {
        Card.findByIdAndRemove(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Данные не прошли валидацию')); // ---ошибка 400
      }
      next(err);
    })
    .catch(next);
};
