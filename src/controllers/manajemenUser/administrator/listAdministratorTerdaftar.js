const UserDashboard = require('../../../models/').UserDashboard
const Sekolah = require('../../../models/').Sekolah

async function listAdministratorTerdaftar (level_user, kode_sekolah) {
  if (level_user === 0) {
    let returnedArray = []
    try {
      let listDataAdmin = await UserDashboard.find()
      for (var i = 0; i < listDataAdmin.length; i++) {
        let temp = {
          _id: '',
          namaAdmin: '',
          peran: '',
          foto: '',
          totalSekolah: 0
        }
        temp._id = listDataAdmin[i]._id
        temp.namaAdmin = listDataAdmin[i].nama
        temp.foto = listDataAdmin[i].foto
        temp.peran = listDataAdmin[i].peran == 0 ? 'Super Admin' : 'Administrator'
        temp.totalSekolah = listDataAdmin[i].kode_sekolah.length
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        data: returnedArray,
        status: 200
      }
    } catch (err) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  } else {
    let returnedArray = []
    let objectUntukSearchBerdasarkanSekolah = []
    for (var i = 0; i < kode_sekolah.length; i++) {
      objectUntukSearchBerdasarkanSekolah.push({
        kode_sekolah: kode_sekolah[i]
      })
    }
    try {
      let temp = {
        _id: '',
        namaAdmin: '',
        peran: '',
        totalSekolah: 0
      }
      let listDataAdmin = await UserDashboard.find({$or: [...objectUntukSearchBerdasarkanSekolah]})
      for (var i = 0; i < listDataAdmin.length; i++) {
        temp._id = listDataAdmin[i]._id
        temp.namaAdmin = listDataAdmin[i].namaAdmin
        temp.peran = listDataAdmin[i].peran == 0 ? 'Super Admin' : 'Administrator'
        temp.totalSekolah = listDataAdmin[i].kode_sekolah.length
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        data: returnedArray,
        status: 200
      }
    } catch (err) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

module.exports = listAdministratorTerdaftar;
