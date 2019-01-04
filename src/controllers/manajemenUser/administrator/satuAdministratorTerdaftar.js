const UserDashboard = require('../../../models/').UserDashboard
const Sekolah = require('../../../models/').Sekolah
const Wilayah = require('../../../models/').Wilayah

async function satuAdministratorTerdaftar (level_user, id, idAdminYgMauDicari) {
  if (level_user === 0 || id === idAdminYgMauDicari) {
    try {
      let dataAdmin = await UserDashboard.findById(idAdminYgMauDicari).populate('kode_sekolah')

      let dataAdminWithDaerah = await Wilayah.populate(dataAdmin, {path: "kode_sekolah.kode_pos"})
      let sekolahWithDaerah = []
      let sekolahWithDaerahAdmin = []
      let objectSekolahYgAdminPegang = []
      for (var i = 0; i < dataAdminWithDaerah.kode_sekolah.length; i++) {
        let tempSekolahWithDaerahObject = {
          kode_sekolah: dataAdminWithDaerah.kode_sekolah[i]._id,
          namaSekolah: dataAdminWithDaerah.kode_sekolah[i].nama_sekolah,
          daerahKota: dataAdminWithDaerah.kode_sekolah[i].kode_pos.kota,
          daerahProvinsi: dataAdminWithDaerah.kode_sekolah[i].kode_pos.provinsi
        }
        objectSekolahYgAdminPegang.push({
          _id: {'$ne': tempSekolahWithDaerahObject.kode_sekolah}
        })
        sekolahWithDaerahAdmin.push(tempSekolahWithDaerahObject)
      }
      let listSekolah = await Sekolah.find({$or: [...objectSekolahYgAdminPegang]}).populate('kode_pos')
      for (var i = 0; i < listSekolah.length; i++) {
        let tempSekolahWithDaerahObject = {
          kode_sekolah: listSekolah[i]._id,
          namaSekolah: listSekolah[i].nama_sekolah,
          daerahKota: listSekolah[i].kode_pos.kota,
          daerahProvinsi: listSekolah[i].kode_pos.provinsi
        }
        sekolahWithDaerah.push(tempSekolahWithDaerahObject)
      }
      let temp = {
        nama: dataAdminWithDaerah.nama,
        email: dataAdminWithDaerah.email,
        telepon: dataAdminWithDaerah.telepon,
        peran: dataAdminWithDaerah.level_user,
        alamat: dataAdminWithDaerah.alamat,
        password: dataAdminWithDaerah.password,
        sekolah: sekolahWithDaerahAdmin,
        listSekolah: sekolahWithDaerah,
        riwayatUser: dataAdminWithDaerah.riwayat_user
      }
      return {
        status: 200,
        data: temp,
        message: 'Request Success'
      }
    } catch (e) {
      console.log(e);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  } else {
    return {
      message: 'Unauthorized',
      status: 401
    }
  }
}

module.exports = satuAdministratorTerdaftar;
