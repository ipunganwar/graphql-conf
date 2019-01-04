const UserDashboard = require('../../../models/').UserDashboard
const Sekolah = require('../../../models/').Sekolah
const Pelanggan = require('../../../models/').Pelanggan
const Outlet = require('../../../models/').Outlet

async function listSekolahTerdaftar (level_user, kode_sekolah) {
  if (level_user === 0) {
    let returnedArray = []
    try {
      let listDataSekolah = await Sekolah.find().populate('kode_pos')
      for (var i = 0; i < listDataSekolah.length; i++) {
        let temp = {
          _id: '',
          namaSekolah: '',
          daerahKota: '',
          daerahProvinsi: '',
          fotoAdmin: [],
          totalKantin: 0,
          totalStaff: 0,
          totalSiswa: 0
        }
        temp._id = listDataSekolah[i]._id
        temp.namaSekolah = listDataSekolah[i].nama_sekolah
        temp.daerahKota = listDataSekolah[i].kode_pos.kota
        temp.daerahProvinsi = listDataSekolah[i].kode_pos.provinsi
        let results = await Promise.all([
          UserDashboard.find({kode_sekolah: {'$elemMatch': {'$eq':listDataSekolah[i].kode_sekolah}}}),
          Pelanggan.count({kode_sekolah: listDataSekolah[i].kode_sekolah, peran: 4}),
          Pelanggan.count({kode_sekolah: listDataSekolah[i].kode_sekolah, peran: {$lte: 3}}),
          Outlet.count({kode_sekolah: listDataSekolah[i].kode_sekolah})
        ])
        for (var j = 0; j < results[0].length; j++) {
          temp.fotoAdmin.push(results[0][j]['foto'])
        }
        temp.totalStaff = results[1]
        temp.totalSiswa = results[2]
        temp.totalKantin = results[3]
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        status: 200,
        data: returnedArray
      }
    } catch (err) {
      console.log('src/controllers/manajemenUser/sekolahTerdaftar/listSekolahTerdaftar/:46 -->\n', err);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  } else if (level_user === 1) {
    let returnedArray = []
    let objectUntukSearchBerdasarkanSekolah = []
    for (var i = 0; i < kode_sekolah.length; i++) {
      objectUntukSearchBerdasarkanSekolah.push({
        _id: kode_sekolah[i]
      })
    }
    try {
      let listDataSekolah = await Sekolah.find({$or: [...objectUntukSearchBerdasarkanSekolah]}).populate('kode_pos')
      for (var i = 0; i < listDataSekolah.length; i++) {
        let temp = {
          _id: '',
          namaSekolah: '',
          daerahKota: '',
          daerahProvinsi: '',
          fotoAdmin: [],
          totalKantin: 0,
          totalStaff: 0,
          totalSiswa: 0
        }
        temp.namaSekolah = listDataSekolah[i].nama_sekolah
        temp._id = listDataSekolah[i]._id
        temp.daerahKota = listDataSekolah[i].kode_pos.kota
        temp.daerahProvinsi = listDataSekolah[i].kode_pos.provinsi
        let results = await Promise.all([
          UserDashboard.find({kode_sekolah: {'$elemMatch': {'$eq':listDataSekolah[i].kode_sekolah}}}),
          Pelanggan.count({kode_sekolah: listDataSekolah[i].kode_sekolah, peran: 4}),
          Pelanggan.count({kode_sekolah: listDataSekolah[i].kode_sekolah, peran: {$lte: 3}}),
          Outlet.count({kode_sekolah: listDataSekolah[i].kode_sekolah})
        ])
        for (var j = 0; j < results[0].length; j++) {
          temp.fotoAdmin.push(results[0][j]['foto'])
        }
        temp.totalStaff = results[1]
        temp.totalSiswa = results[2]
        temp.totalKantin = results[3]
        returnedArray.push(temp)
      }
      return {
        message: 'Request Success',
        status: 200,
        data: returnedArray
      }
    } catch (err) {
      console.log('src/controllers/manajemenUser/sekolahTerdaftar/listSekolahTerdaftar/:97 -->\n', err);
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

module.exports = listSekolahTerdaftar;
