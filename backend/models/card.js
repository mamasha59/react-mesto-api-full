const mongoose = require('mongoose');

const userCard = new mongoose.Schema({
  name: { // имя карточки
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: { // ссылка на картинку
    type: String, //  ---тип строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} невалидная ссылка`,
    },
  },
  owner: { // ссылка на модель автора карточки
    type: mongoose.Schema.Types.ObjectId, //  ---тип обьект
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    ref: 'User',
  },
  likes: { //  список лайкнувших пост пользователей
    type: [{ type: mongoose.Schema.Types.ObjectId }], // ---тип обьект
    default: [],
  },
  createdAt: { //  дата создания
    type: Date, //  ---тип строка
    default: Date.now,
  },
});
module.exports = mongoose.model('card', userCard);
