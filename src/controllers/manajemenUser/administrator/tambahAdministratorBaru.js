const UserDashboard = require('../../../models/').UserDashboard
var encrypt = require('../../../helpers/cryptoHelper')

async function tambahAdministratorBaru (level_user, data) {
  if (level_user === 0) {
    try {
      if (typeof data.kode_sekolah === 'string') {
        data.kode_sekolah = [data.kode_sekolah]
      }
      let newAdmin = await UserDashboard.create({
        password: encrypt(data.password),
        nama: data.nama,
        email: data.email,
        level_user: data.level_user,
        foto: data.foto,
        kode_sekolah: data.kode_sekolah,
        telepon: data.telepon,
        alamat: data.alamat,
      })
      return {
        message: 'Request Success',
        data: newAdmin,
        status: 200
      }
    } catch (e) {
      console.log(e);
      if (e.errmsg.indexOf('email_1 dup key') > -1) {
        return {
          message: 'Email must unique',
          status: 400
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

module.exports = tambahAdministratorBaru;
