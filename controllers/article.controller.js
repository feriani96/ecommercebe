const Article = require('../models/article.model');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createArticle = async (req, res) => {
    const { name, price, size, imageUrl } = req.body;
    try {
        const newArticle = new Article({ name, price, size, imageUrl });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const { name, price, size, imageUrl } = req.body;
    try {
      const updatedArticle = await Article.findByIdAndUpdate(id, { name, price, size, imageUrl }, { new: true });
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedArticle = await Article.findByIdAndDelete(id);
      if (!deletedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
