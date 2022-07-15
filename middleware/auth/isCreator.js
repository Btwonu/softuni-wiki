const articleService = require('../../services/articleService');

module.exports = async (req, res, next) => {
  const articleId = req.params.articleId;

  const article = await articleService.getOne(articleId);

  if (req.user.id !== article.articleAuthor.toString()) {
    // todo error handling
    // return res.redirect('/');
    res.locals.isCreator = false;
  } else {
    res.locals.isCreator = true;
  }

  // res.locals.isCreator = req.user.id;

  next();
};
