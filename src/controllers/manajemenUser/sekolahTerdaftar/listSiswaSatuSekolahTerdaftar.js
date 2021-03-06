const Pelanggan = require('../../../models/').Pelanggan

async function listSiswaSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let dataSiswa = await Pelanggan.find({kode_sekolah: idSekolahYgMauDicari, peran: {$lte: 3}})
      let returnedArray = []
      for (var i = 0; i < dataSiswa.length; i++) {
        let temp = {
          _id: dataSiswa[i]._id,
          nisn: dataSiswa[i].username,
          foto: dataSiswa[i].foto_pelanggan,
          nama: dataSiswa[i].nama_pelanggan,
          kelas: dataSiswa[i].kelas,
          jenjang: dataSiswa[i].peran,
          saldo: dataSiswa[i].saldo
        }
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        status: 200,
        data: returnedArray
      }
    } catch (e) {
      console.log('src/controllers/manajemenUser/sekolahTerdaftar/listSiswaSatuSekolahTerdaftar/:25', e);
      return {
        message: 'Internal Server Error',
        status: 500,
      }
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = listSiswaSatuSekolahTerdaftar;
