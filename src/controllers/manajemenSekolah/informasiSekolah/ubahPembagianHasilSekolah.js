const Sekolah = require('../../../models/').Sekolah

async function ubahPembagianHasilSekolah (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let objectFee = {
        tanggal_penetapan: new Date(),
        fee_sekolah: 0,
        jenis_fee_sekolah: 1,
        fee_sap: 0,
        jenis_fee_sap: 1,
        fee_ski: 0,
        jenis_fee_ski: 1
      }
      if (data.fee_sekolah.indexOf('%') > -1) {
        objectFee.jenis_fee_sekolah = 0
        objectFee.fee_sekolah = parseFloat(data.fee_sekolah.trim().split('%')[0])
      } else {
        objectFee.fee_sekolah = parseInt(data.fee_sekolah.replace(/\D/g,''))
      }
      if (data.fee_sap.indexOf('%') > -1) {
        objectFee.jenis_fee_sap = 0
        objectFee.fee_sap = parseFloat(data.fee_sap.trim().split('%')[0])
      } else {
        objectFee.fee_sap = parseInt(data.fee_sap.replace(/\D/g,''))
      }
      if (data.fee_ski.indexOf('%') > -1) {
        objectFee.jenis_fee_ski = 0
        objectFee.fee_ski = parseFloat(data.fee_ski.trim().split('%')[0])
      } else {
        objectFee.fee_ski = parseInt(data.fee_ski.replace(/\D/g,''))
      }
      let dataSekolahBaru = await Sekolah.findByIdAndUpdate(idSekolahYgMauDicari, {$push: {fee: {
        tanggal_penetapan: objectFee.tanggal_penetapan,
        fee_sekolah: objectFee.fee_sekolah,
        fee_sap: objectFee.fee_sap,
        fee_ski: objectFee.fee_ski,
        jenis_fee_sekolah: objectFee.jenis_fee_sekolah,
        jenis_fee_sap: objectFee.jenis_fee_sap,
        jenis_fee_ski: objectFee.jenis_fee_ski,
      }}}, {new: true})
      return {
        message: 'Request Success',
        status: 200,
        data: dataSekolahBaru
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/informasiSekolah/ubahPembagianHasilSekolah/:48', err);
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

module.exports = ubahPembagianHasilSekolah;
