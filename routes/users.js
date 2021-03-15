const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getUser } = require('../controllers/users');

// returns information about the logged-in user (email and name)
router.get('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), getUser);

module.exports = router;
