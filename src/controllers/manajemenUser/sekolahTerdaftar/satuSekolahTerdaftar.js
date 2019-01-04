const Sekolah = require('../../../models/').Sekolah
const Pelanggan = require('../../../models/').Pelanggan
const Outlet = require('../../../models/').Outlet
const Menu = require('../../../models/').Menu

async function satuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    let results = await Promise.all([
      Sekolah.findOne({_id: idSekolahYgMauDicari}).populate('kode_pos'),
      Pelanggan.count({kode_sekolah: idSekolahYgMauDicari, peran: 4}),
      Pelanggan.count({kode_sekolah: idSekolahYgMauDicari, peran: {$lte: 3}}),
      Outlet.find({kode_sekolah: idSekolahYgMauDicari})
    ])
    let dataSekolah = results[0]
    let totalStaff = results[1]
    let totalSiswa = results[2]

    // method untuk misahin kantin yg sama
    let listKantinYgAda = []
    let filteredOutletYgSatuKantin = results[3]
    filteredOutletYgSatuKantin = filteredOutletYgSatuKantin.filter((data) => {
      if(listKantinYgAda.indexOf(data.kode_kantin) == -1) {
        listKantinYgAda.push(data.kode_kantin)
        return data
      }
    })
    let objectUntukSearchKantin = []
    for (var i = 0; i < listKantinYgAda.length; i++) {
      objectUntukSearchKantin.push({
        kode_kantin: listKantinYgAda[i]
      })
    }
    let totalMenu = await Menu.count({$or: [...objectUntukSearchKantin]})
    let jumlah_istirahat = 0
    if (dataSekolah.jumlah_istirahat) {
      if (dataSekolah.jumlah_istirahat.istirahat1)
        jumlah_istirahat++
      if (dataSekolah.jumlah_istirahat.istirahat2)
        jumlah_istirahat++
      if (dataSekolah.jumlah_istirahat.istirahat3)
        jumlah_istirahat++
    }
    let sekolah = {
      nis: dataSekolah._id,
      namaSekolah: dataSekolah.nama_sekolah,
      jenjang: dataSekolah.jenjang,
      alamat: dataSekolah.alamat,
      daerahKota: dataSekolah.kode_pos.kota,
      daerahProvinsi: dataSekolah.kode_pos.provinsi,
      kode_pos: dataSekolah.kode_pos._id,
      akunBank: dataSekolah.rekening,
      koordinator: dataSekolah.koordinator,
      email: dataSekolah.email,
      telepon: dataSekolah.telepon,
      jumlahIstirahat: jumlah_istirahat,
      waktuTransfer: dataSekolah.waktu_transfer,
      tanggalBergabung: dataSekolah.created_at,
    }
    let temp = {
      totalKantin: listKantinYgAda.length,
      totalMenu: totalMenu,
      totalStaff: totalStaff,
      totalSiswa: totalSiswa,
      sekolah
    }
    return {
      message: 'Request Success',
      status: 200,
      data: temp
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = satuSekolahTerdaftar;
