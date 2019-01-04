const moment = require('moment-timezone')

function dateCreator() {
  return moment.utc().tz('Asia/Jakarta').format()
}

module.exports = dateCreator;
