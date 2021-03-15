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
const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/articlesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

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

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
