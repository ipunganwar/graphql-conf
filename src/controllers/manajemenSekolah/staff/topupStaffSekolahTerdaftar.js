const Topup = require('../../../models/').Topup

async function topupStaffSekolahTerdaftar (level_user, kode_sekolah, idPelanggan) {
  try {
    let dataTopup = await Topup.find({kode_pelanggan: idPelanggan})
    return {
      message: 'Request Success',
      status: 200,
      data: dataTopup
    }
  } catch (err) {
    console.log('src/controllers/manajemenSekolah/staff/listStaffSekolahTerdaftar/:40', err);
    return {
      message: 'Internal Server Error',
      status: 500
    }
  }
}

module.exports = topupStaffSekolahTerdaftar;
