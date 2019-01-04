const Sekolah = require('../../../models/').Sekolah

async function ubahJadwalIstirahatSekolah (level_user, kode_sekolah, idSekolahYgMauDicari, data) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let objectIstirahat = {
        istirahat1: false,
        istirahat2: false,
        istirahat3: false,
        istirahat1_start: '',
        istirahat1_end: '',
        istirahat2_start: '',
        istirahat2_end: '',
        istirahat3_start: '',
        istirahat3_end: '',
      }
      if (data.istirahat1) {
        objectIstirahat.istirahat1 = true
        let arraySplit = data.istirahat1.trim().split('-')
        objectIstirahat.istirahat1_start = arraySplit[0]
        objectIstirahat.istirahat1_end = arraySplit[1]
      }
      if (data.istirahat2) {
        objectIstirahat.istirahat2 = true
        let arraySplit = data.istirahat2.trim().split('-')
        objectIstirahat.istirahat2_start = arraySplit[0]
        objectIstirahat.istirahat2_end = arraySplit[1]
      }
      if (data.istirahat3) {
        objectIstirahat.istirahat3 = true
        let arraySplit = data.istirahat3.trim().split('-')
        objectIstirahat.istirahat3_start = arraySplit[0]
        objectIstirahat.istirahat3_end = arraySplit[1]
      }
      let dataSekolahBaru = await Sekolah.findByIdAndUpdate(idSekolahYgMauDicari, {jumlah_istirahat: objectIstirahat}, {new: true})
      return {
        message: 'Request Success',
        data: dataSekolahBaru,
        status: 200
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolah/informasiSekolah/satuInformasiSekolah/:47', err);
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

module.exports = ubahJadwalIstirahatSekolah;
