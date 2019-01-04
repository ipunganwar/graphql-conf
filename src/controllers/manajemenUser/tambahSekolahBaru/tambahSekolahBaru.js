const Sekolah = require('../../../models/').Sekolah

async function tambahSekolahBaru (level_user, data) {
  if (level_user === 0) {
    if (!data.nama || !data.nis || !data.jenjang || !data.alamat || !data.telepon || !data.kode_pos || !data.email || !data.koordinator || !data.akunBank) {
      return {
        message: 'Bad Request, Some Required Params not exist',
        status: 400
      }
    } else {
      try {
        if (typeof data.akunBank == 'string') {
          data.akunBank = JSON.parse(data.akunBank)
        }
        let dataSekolahBaru = await Sekolah.create({
          nama_sekolah: data.nama,
          _id: data.nis,
          jenjang: data.jenjang,
          alamat_sekolah: data.alamat,
          no_telp: data.telepon,
          kode_pos: data.kode_pos,
          email: data.email,
          koordinator: data.koordinator,
          rekening: data.akunBank,
          jumlah_istirahat: {
            istirahat1: true,
            istirahat2: true,
            istirahat3: false,
            istirahat1_start: '10.00',
            istirahat1_end: '10.15',
            istirahat2_start: '12.00',
            istirahat2_end: '12.30'
          }
        })
        return {
          message: 'Request Success',
          status: 200,
          data: dataSekolahBaru
        }
      } catch (e) {
        console.log('src/controllers/manajemenUser/sekolahTerdaftar/tambahSekolahBaru/:25', e);
        return {
          message: 'Internal Server Error',
          status: 500,
        }
      }
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = tambahSekolahBaru;
