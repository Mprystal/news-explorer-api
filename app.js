require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const {
  createUser, login,
} = require('./controllers/users');
const NotFoundError = require('./middleware/notFoundError');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect('mongodb://localhost:27017/articlesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}),
createUser);

app.use(auth);
app.use('/', userRouter);
app.use('/', articleRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'An error occurred on the server' : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
