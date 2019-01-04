const jwt = require('jsonwebtoken');

module.exports = (jwt_hash) => {
  if (jwt_hash) {
    const user = jwt.verify(jwt_hash, process.env.JWT_SALT)
    if (user.kode_outlet && user.username) {
      return user.kode_outlet
    } else {
      return false
    }
  } else {
    return false
  }
};
