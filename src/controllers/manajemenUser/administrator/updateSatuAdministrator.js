const UserDashboard = require('../../../models/').UserDashboard
var encrypt = require('../../../helpers/cryptoHelper')

async function updateSatuAdministrator (level_user, data) {
  if (level_user === 0) {
    try {
      if (data.password) {
        data.password = encrypt(data.password)
      }
      let dataAdminUpdated = await UserDashboard.findByIdAndUpdate(data._id, data, {new: true})
      return {
        message: 'Request Success',
        data: dataAdminUpdated,
        status: 200
      }
    } catch (e) {
      if (e.errmsg.indexOf('email_1 dup key') > -1) {
        return {
          message: 'Email must unique',
          status: 500
        }
      } else {
        return {
          message: 'Internal Server Error',
          status: 500
        }
      }
    }
  } else {
    return {
      message: 'Unauthorized',
      status: 401
    }
  }
}

module.exports = updateSatuAdministrator;
