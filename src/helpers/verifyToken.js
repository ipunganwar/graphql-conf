const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.token) {
    const user = jwt.verify(req.headers.token, process.env.JWT_SALT, (err, user) => {
      if (!err && user._id && user.username) {
        // res.send(req.query.token)
        next();
      } else if (err) {
        const resp = {
          status: 422,
          message: 'invalid token',
          payload: null,
          error: err
        }
        res.status(resp.status).send({message: resp.message, error: resp.error});
      }
    });
  } else {
    const resp = {
      status: 422,
      message: 'not signed in',
      payload: null,
      error: 'Authentication Error'
    }
    res.status(resp.status).send({message: resp.message, error: resp.error});
  }
};
