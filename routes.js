const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const articleController = require('./controllers/articleController');
const { Router } = require('express');

const router = Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/articles', articleController);

module.exports = router;
