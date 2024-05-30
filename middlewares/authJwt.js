const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (user.roles.includes('admin')) {
    next();
    return;
  }

  res.status(403).send({ message: 'Require Admin Role!' });
};

isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (user.roles.includes('moderator')) {
    next();
    return;
  }

  res.status(403).send({ message: 'Require Moderator Role!' });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
