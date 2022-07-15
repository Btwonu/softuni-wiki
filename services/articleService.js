const Article = require('../models/Article');

const createOne = (data, userId) => {
  const article = new Article({ ...data, articleAuthor: userId });

  return article.save();
};

const getAll = async () => {
  return await Article.find({}).lean();
};

const getOne = async (articleId) => {
  return Article.findById(articleId).lean();
};

const updateOne = async (articleId, data) => {
  return Article.updateOne({ _id: articleId }, data, { runValidators: true });
};

const deleteOne = async (articleId) => {
  return Article.findByIdAndDelete(articleId);
};

const getFiltered = async () => {
  return Article.find({}).sort({ creationDate: -1 }).limit(3).lean();
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
  getFiltered,
};
