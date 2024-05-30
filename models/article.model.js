const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: String,
  imageUrl: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
