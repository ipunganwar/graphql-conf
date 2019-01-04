const Sekolah = require('../../../models/').Sekolah
const Menu = require('../../../models/').Menu
const Kantin = require('../../../models/').Kantin
const Pelanggan = require('../../../models/').Pelanggan
const Outlet = require('../../../models/').Outlet
const UserDashboard = require('../../../models/').UserDashboard

async function generateData (dataSekolah) {
  let returnedArray = []
  for (var i = 0; i < dataSekolah.length; i++) {
    let temp = {
      _id: '',
      namaSekolah: '',
      daerahKota: '',
      daerahProvinsi: '',
      fotoAdmin: [],
      totalKantin: 0,
      totalMenu: 0,
      totalStaff: 0,
      totalSiswa: 0
    }
    temp._id = dataSekolah[i]._id
    temp.namaSekolah = dataSekolah[i].nama_sekolah
    temp.daerahKota = dataSekolah[i].kode_pos.kota
    temp.daerahProvinsi = dataSekolah[i].kode_pos.provinsi
    let results = await Promise.all([
      UserDashboard.find({kode_sekolah: {'$elemMatch': {'$eq':dataSekolah[i].kode_sekolah}}}),
      Pelanggan.count({kode_sekolah: dataSekolah[i].kode_sekolah, peran: 4}),
      Pelanggan.count({kode_sekolah: dataSekolah[i].kode_sekolah, peran: {$lte: 3}}),
      Outlet.find({kode_sekolah: dataSekolah[i].kode_sekolah})
    ])
    for (var j = 0; j < results[0].length; j++) {
      temp.fotoAdmin.push(results[0][j]['foto'])
    }
    temp.totalStaff = results[1]
    temp.totalSiswa = results[2]
    let filteredOutletYgSatuKantin = results[3]
    let listKantinYgAda = []
    filteredOutletYgSatuKantin = filteredOutletYgSatuKantin.filter((data) => {
      if(listKantinYgAda.indexOf(data.kode_kantin) == -1) {
        listKantinYgAda.push(data.kode_kantin)
        return data
      }
    })
    let objectUntukSearchKantin = []
    for (var j = 0; j < listKantinYgAda.length; j++) {
      objectUntukSearchKantin.push({
        kode_kantin: listKantinYgAda[j]
      })
    }
    let totalMenu = 0
    if (objectUntukSearchKantin.length) {
      totalMenu = await Menu.count({$or: [...objectUntukSearchKantin]})
    }
    temp.totalMenu = totalMenu
    returnedArray.push(temp)
  }
  return returnedArray
}

async function listSekolahTerdaftar (level_user, kode_sekolah) {
  if (level_user == 0) {
    try {
      let dataSekolah = await Sekolah.find().populate('kode_pos')
      let returnedArray = await generateData(dataSekolah)
      return {
        status: 200,
        message: 'Request Success',
        data: returnedArray
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/informasiSekolah/listSekolahTerdaftar/:72', err);
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }
  } else if (level_user == 1) {
    try {
      let objectUntukSearchBerdasarkanSekolah = []
      for (var i = 0; i < kode_sekolah.length; i++) {
        objectUntukSearchBerdasarkanSekolah.push({
          _id: kode_sekolah[i]
        })
      }
      let dataSekolah = await Sekolah.find({$or: [...objectUntukSearchBerdasarkanSekolah]}).populate('kode_pos')
      let returnedArray = await generateData(dataSekolah)
      return {
        status: 200,
        message: 'Request Success',
        data: returnedArray
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/informasiSekolah/listSekolahTerdaftar/:94', err);
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }
  } else {
    return {
      message: 'Forbidden',
      status:403
    }
  }
}

module.exports = listSekolahTerdaftar;
