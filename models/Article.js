const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    trim: true,
  },
  articleAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
