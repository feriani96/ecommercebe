const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');

router.post('/signup', register);
router.post('/signin', login);
router.post('/signout', logout);

module.exports = router;
