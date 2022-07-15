const { Router } = require('express');
const authService = require('../services/authService');
const articleService = require('../services/articleService');
const { seedDatabase, clearDatabase } = require('../services/seed');

const router = Router();

router.get('/', (req, res, next) => {
  const showcasedArticles = [];

  articleService.getFiltered().then((data) => {
    data.forEach((article) => {
      article.description = article.description
        .split(' ')
        .slice(0, 49)
        .join(' ');

      showcasedArticles.push(article);
    });

    console.log(showcasedArticles);
    res.render('index', { showcasedArticles });
  });
});

router.get('/seed', (req, res, next) => {
  seedDatabase()
    .then((data) => {
      console.log('DB Seeded!', data);
      res.send('ok');
    })
    .catch(next);
});

router.get('/seed/delete', (req, res, next) => {
  clearDatabase()
    .then((data) => {
      console.log('Collection cleared!', data);
      res.send('ok');
    })
    .catch(next);
});

module.exports = router;
