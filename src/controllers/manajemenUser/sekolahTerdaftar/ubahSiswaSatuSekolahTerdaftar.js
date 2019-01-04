const Pelanggan = require('../../../models/').Pelanggan

async function ubahSiswaSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    if (data._id) {
      return {
        message: 'Bad Request _id Params not exist',
        status: 400
      }
    }
    let temp = {}
    if (data.password) {
      temp.password = encrypt(data.password)
    }
    if (data.telepon) {
      temp.telepon = data.telepon
    }
    if (data.email) {
      temp.email = data.email
    }
    if (data.alamat) {
      temp.alamat = data.alamat
    }
    if (data.kelas) {
      temp.kelas = data.kelas
    }
    if (data.nisn) {
      temp.username = data.nisn
    }
    if (data.nama) {
      temp.nama_pelanggan = data.nama
    }
    if (data.peran) {
      temp.peran = data.peran
    }
    if (data.foto) {
      temp.foto_pelanggan = data.foto
    }
    try {
      let userBaru = await Pelanggan.findByIdAndUpdate(data.id, temp, {new: true})
      return {
        data: userBaru,
        message: 'Request Success',
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

module.exports = ubahSiswaSatuSekolahTerdaftar;
