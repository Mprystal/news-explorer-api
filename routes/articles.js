const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const router = express.Router();

// returns all articles saved by the user
router.get('/articles', getArticles);

// creates an article with the passed
// keyword, title, text, date, source, link, and image in the body
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
}), createArticle);

// # deletes the stored article by _id
router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
