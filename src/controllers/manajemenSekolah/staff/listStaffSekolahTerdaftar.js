const Pelanggan = require('../../../models/').Pelanggan

async function listStaffSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let returnedArray = []
      let dataStaff = await Pelanggan.find({kode_sekolah: idSekolahYgMauDicari, peran: 4})
      for (var i = 0; i < dataStaff.length; i++) {
        let temp = {
          _id: '',
          nip: '',
          foto: '',
          nama: '',
          saldo: 0
        }
        temp.nip = dataStaff[i].username
        temp.foto = dataStaff[i].foto_pelanggan
        temp.nama = dataStaff[i].nama_pelanggan
        temp.saldo = dataStaff[i].saldo
        temp._id = dataStaff[i]._id
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        data: returnedArray,
        status: 200
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/staff/listStaffSekolahTerdaftar/:47', err);
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

module.exports = listStaffSekolahTerdaftar;
