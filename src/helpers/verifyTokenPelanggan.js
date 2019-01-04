const jwt = require('jsonwebtoken');

module.exports = (jwt_hash) => {
  if (jwt_hash) {
    const user = jwt.verify(jwt_hash, process.env.JWT_SALT)
    if (user.kode_pelanggan && user.username) {
      return user.kode_pelanggan
    } else {
      return false
    }
  } else {
    return false
  }
};
