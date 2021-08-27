//  --файл маршрутов
const routes = require('express').Router();
const {
  validationUserId, avatarValidation, usrMeValidation,
} = require('../middlewares/serverValidationForData');

const {
  getUser, getUsers, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

routes.get('/me', getUserInfo); // --- информация текущего пользователя

routes.get('/:userId', validationUserId, getUser); // ---возвращает пользователя по _id

routes.get('/', getUsers); //  ---возвращает всех пользователей

routes.patch('/me', usrMeValidation, updateUserInfo); //  ---обновляет профиль

routes.patch('/me/avatar', avatarValidation, updateUserAvatar); //  ---обновляет аватар

module.exports = routes;
