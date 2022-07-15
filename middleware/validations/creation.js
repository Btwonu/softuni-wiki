module.exports = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || title.length < 5) {
    return res.render('create', {
      error: {
        message: 'Article title should be at least 5 characters long',
      },
    });
  }

  if (!description || description.length < 20) {
    return res.render('create', {
      error: {
        message: 'Article description should be at least 20 characters long',
      },
    });
  }

  next();
};
