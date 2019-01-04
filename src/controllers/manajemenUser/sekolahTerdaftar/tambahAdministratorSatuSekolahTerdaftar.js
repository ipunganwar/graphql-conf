const UserDashboard = require('../../../models/').UserDashboard
const listAdministratorSatuSekolahTerdaftar = require('./listAdministratorSatuSekolahTerdaftar')

async function tambahAdministratorSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let userBaru = await UserDashboard.findByIdAndUpdate(data.kode_admin, {$push: {kode_sekolah: idSekolahYgMauDicari}}, {new: true})
      return listAdministratorSatuSekolahTerdaftar(level_user, kode_sekolah, idSekolahYgMauDicari)
    } catch (e) {
      console.log('/src/controllers/manajemenUser/sekolahTerdaftar/tambahAdministratorSatuSekolahTerdaftar/:10', e);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
    return {
      message: 'Request Success',
      status: 200
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = tambahAdministratorSatuSekolahTerdaftar;
