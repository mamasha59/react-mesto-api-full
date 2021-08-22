const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationSignin, validationSignUp } = require('./middlewares/serverValidationForData');
const NotFoundError = require('./errors/not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => { // ---краш тест
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validationSignin, login); // ----авторизация
app.post('/signup', validationSignUp, createUser);// ----регистрация

app.use(auth);

app.use('/', userRoutes); // ---общие роуты
app.use('/', cardRoutes); // ---общие роуты

app.all('*', () => { // ---ошибка при несуществующем адресе
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => { // ---  централизованая ошибка
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Произошла ошибка на стороне сервера' : message,
  });
});

app.listen(PORT);
