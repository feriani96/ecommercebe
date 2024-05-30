exports.getPublicContent = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.getUserBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.getModeratorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

exports.getAdminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};
