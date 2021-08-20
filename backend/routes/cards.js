//  --файл маршрутов
const routes = require('express').Router();
const { validationCardId, getCardValidation } = require('../middlewares/serverValidationForData');

const {
  createCard,
  getCards,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

routes.delete('/cards/:cardId', validationCardId, deleteCard); // ---удаляет карточку по _id

routes.get('/cards', getCards); //  --- возвращает все карточки из базы

routes.post('/cards', getCardValidation, createCard); // ---создаёт карточку с переданными в теле запроса name и link, устанавливает поле owner для карточки

routes.put('/cards/:cardId/likes', validationCardId, likeCard); //  ---ставит лайк карточке

routes.delete('/cards/:cardId/likes', validationCardId, dislikeCard); //  --- убирает лайк с карточки

module.exports = routes;
