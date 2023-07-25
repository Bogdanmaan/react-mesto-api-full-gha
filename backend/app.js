const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { errors, celebrate, Joi } = require('celebrate');

const { createUser, login } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-error');

const errorHandler = require('./middlewares/error-handler');

// eslint-disable-next-line no-useless-escape
const urlRegExp = /http[s]?:\/\/(www\.)?[\w\d\-\._~:\?#@!$&'()*+,;=[]+#?/im;

const { PORT = 4000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post(
  '/signup',

  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),

      about: Joi.string().min(2).max(30),

      avatar: Joi.string().pattern(urlRegExp),

      email: Joi.string().required().email(),

      password: Joi.string().required(),
    }),
  }),

  createUser,
);

app.post(
  '/signin',

  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),

      password: Joi.string().required(),
    }),
  }),

  login,
);

app.use(auth);

app.use(userRouter);

app.use(cardRouter);

app.use('*', (req, res, next) => next(new NotFoundError('Несуществующий адрес')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
