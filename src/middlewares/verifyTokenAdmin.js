const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.JWT_SALT, (err, user) => {
      if (err && err.name === 'TokenExpiredError') {
        res.status(401).send({
          message: 'Authentication Error \n token expired',
          status: 'Request Failed'
        });
      } else if (err && err.name === 'JsonWebTokenError') {
        res.status(403).send({
          message: 'Authentication Error \n token error',
          status: 'Request Failed'
        });
      } else if (!user.email || !user._id) {
        res.status(403).send({
          message: 'Authentication Error \n wrong token',
          status: 'Request Failed'
        });
      } else {
        req.tokenContent = user
        next()
      }
    })
  } else {
    res.status(401).send({
      message: 'Authentication Error \n token not exist'
    })
  }
};
