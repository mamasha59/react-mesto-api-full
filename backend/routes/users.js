//  --файл маршрутов
const routes = require('express').Router();
const {
  validationUserId, avatarValidation, usrMeValidation,
} = require('../middlewares/serverValidationForData');

const {
  getUser, getUsers, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

routes.get('/users/me', getUserInfo); // --- информация текущего пользователя

routes.get('/users/:userId', validationUserId, getUser); // ---возвращает пользователя по _id

routes.get('/users', getUsers); //  ---возвращает всех пользователей

routes.patch('/users/me', usrMeValidation, updateUserInfo); //  ---обновляет профиль

routes.patch('/users/me/avatar', avatarValidation, updateUserAvatar); //  ---обновляет аватар

module.exports = routes;
