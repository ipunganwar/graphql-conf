const Sekolah = require('../../../models/').Sekolah
const JadwalTutup = require('../../../models/').JadwalTutup

async function tambahJadwalTutupSekolah (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      for (var i = 0; i < data.jadwalTutup.length; i++) {
        let date00 = new Date(data.jadwalTutup[i].tanggal_tutup)
        date00.setHours(00)
        date00.setMinutes(00)
        date00.setSeconds(00)
        date00.setMilliseconds(00)
        let date99 = new Date(data.jadwalTutup[i].tanggal_tutup)
        date99.setHours(23)
        date99.setMinutes(59)
        date99.setSeconds(59)
        date99.setMilliseconds(999)
        let jadwalTutup = await JadwalTutup.findOneAndUpdate({tanggal_tutup: {$lte: date99, $gte: date00}, kode_sekolah: idSekolahYgMauDicari}, {
          kode_sekolah: idSekolahYgMauDicari,
          tanggal_tutup: new Date(data.jadwalTutup[i].tanggal_tutup),
          keterangan: data.jadwalTutup[i].keterangan,
          label: data.jadwalTutup[i].label,
        }, {upsert: true, new: true})
      }
      return {
        message: 'Request Success',
        status: 200,
        data: await JadwalTutup.find({kode_sekolah: idSekolahYgMauDicari})
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/informasiSekolah/tambahJadwalTutupSekolah/:33', err);
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

module.exports = tambahJadwalTutupSekolah;
