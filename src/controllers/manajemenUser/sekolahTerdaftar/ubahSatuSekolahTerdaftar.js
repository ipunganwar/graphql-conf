const Sekolah = require('../../../models/').Sekolah
async function ubahSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    let temp = {}
    try {
      if (data.alamat) {
        temp.alamat_sekolah = data.alamat
      }
      if (data.nama) {
        temp.nama_sekolah = data.nama
      }
      if (data.akunBank) {
        temp.akunBank = data.akunBank
      }
      if (data.koordinator) {
        temp.koordinator = data.koordinator
      }
      if (data.email) {
        temp.email = data.email
      }
      if (data.telepon) {
        temp.no_telp = data.telepon
      }
      let dataSekolahBaru = await Sekolah.findByIdAndUpdate(idSekolahYgMauDicari, temp, {new: true})
      return {
        message: 'Request Success',
        data: dataSekolahBaru,
        status: 200
      }
    } catch (e) {
      console.log('/src/controllers/manajemenUser/sekolahTerdaftar/ubahSiswaSatuSekolahTerdaftar/:47', e);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = ubahSatuSekolahTerdaftar;
