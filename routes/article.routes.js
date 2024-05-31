const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

router.get('/articles', articleController.getAllArticles);
router.post('/articles', articleController.createArticle);
router.get('/articles/:id', articleController.getArticleById);  // Ajoutez cette ligne
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
