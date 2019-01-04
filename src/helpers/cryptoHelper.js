var crypto = require('crypto')
function encrypt (password) {
  const secret = process.env.PASSWORD_SALT;
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

module.exports = encrypt;
