const Article = require('../models/article');
const NotFoundError = require('../middleware/notFoundError');

const getArticles = (req, res) => {
  Article.find({}).then((articles) => res.status(200).send(articles))
    .catch(() => res.status(500).send({ message: 'Sever Error' }));
};

const createArticle = (req, res) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => { res.status(200).send({ data: article.toJSON() }); })
    .catch((err) => console.log(err));
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('No article with such Id');
      }
      if (String(article.owner) !== req.user._id) {
        res.status(403).send({ message: 'You do not have permission' });
        return;
      }
      Article.deleteOne(article).then(() => { res.send({ data: article }); });
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
