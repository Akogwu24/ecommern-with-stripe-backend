const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const verifyIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) return res.status(403).json('Not allowed');
    next();
    // if (req.user.isAdmin) {
    //   next();
    // } else {
    //   res.status(403).json('Not allowed');
    // }
  });
};

module.exports = verifyIsAdmin;
