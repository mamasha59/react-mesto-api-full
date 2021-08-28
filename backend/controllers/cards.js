const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');

module.exports.createCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    res.send({ card });
  } catch (error) {
    next(error);
  }
};

module.exports.getCards = async function (req, res, next) {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send({ cards });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCard = async function (req, res, next) {
  try {
    if (req.params.cardId.length < 24) {
      throw new ValidationError('Переданы некорректные данные');
    }
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundErr('Запрашиваемая карточка не найдена');
    }
    const cardOwnerToString = card.owner.toString();
    if (cardOwnerToString !== req.user._id) {
      throw new ForbiddenError('У вас нет права удалить эту карточку');
    }
    await Card.findByIdAndDelete(card);
    res.send({ card });
  } catch (error) {
    next(error);
  }
};

module.exports.likeCard = async function (req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true });
    if (card === null) {
      throw new NotFoundErr('Запрашиваемая карточка не найдена');
    }
    res.send({ card });
  } catch (error) {
    next(error);
  }
};

module.exports.dislikeCard = async function (req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true });
    if (card === null) {
      throw new NotFoundErr('Запрашиваемая карточка не найдена');
    }
    res.send({ card });
  } catch (error) {
    next(error);
  }
};
