const { Router } = require('express');
const articleService = require('../services/articleService');

const isAuthenticated = require('../middleware/auth/isAuthenticated');
const isCreator = require('../middleware/auth/isCreator');
const validateCreation = require('../middleware/validations/creation');

const router = Router();

router.get('/', (req, res, next) => {
  articleService
    .getAll()
    .then((articles) => {
      res.render('all-articles', { articles });
    })
    .catch(next);
});

router.get('/create', isAuthenticated, (req, res) => {
  res.render('create');
});

router.post('/create', isAuthenticated, validateCreation, (req, res, next) => {
  articleService
    .createOne(req.body, req.user.id)
    .then((data) => {
      console.log('Article created!', data);
      res.redirect('/articles');
    })
    .catch(next);
});

router.get('/:articleId/details', isCreator, (req, res, next) => {
  const articleId = req.params.articleId;

  articleService
    .getOne(articleId)
    .then((article) => {
      res.render('article', { article });
    })
    .catch(next);
});

router.get('/:articleId/delete', isCreator, (req, res, next) => {
  const articleId = req.params.articleId;

  if (!res.locals.isCreator) {
    return next({
      message: 'You are not the creator of this article!',
      status: '403',
    });
  }

  articleService
    .deleteOne(articleId)
    .then((data) => {
      res.redirect('/articles');
    })
    .catch(next);
});

router.get('/:articleId/edit', isAuthenticated, (req, res, next) => {
  const articleId = req.params.articleId;

  articleService
    .getOne(articleId)
    .then((article) => {
      res.render('edit', { article });
    })
    .catch(next);
});

router.post('/:articleId/edit', isAuthenticated, (req, res, next) => {
  const articleId = req.params.articleId;
  const { description } = req.body;

  articleService
    .updateOne(articleId, { description })
    .then((data) => {
      console.log('Updated article!', data);
      res.redirect(`/articles/${articleId}/details`);
    })
    .catch(next);
});

module.exports = router;
