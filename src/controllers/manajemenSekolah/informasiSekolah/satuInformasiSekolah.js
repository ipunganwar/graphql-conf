const Sekolah = require('../../../models/').Sekolah
const UserDashboard = require('../../../models/').UserDashboard
const JadwalTutup = require('../../../models/').JadwalTutup

async function satuInformasiSekolah (level_user, kode_sekolah, idSekolahYgMauDicari) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let results = await Promise.all([
        Sekolah.findOne({_id: idSekolahYgMauDicari}),
        JadwalTutup.find({kode_sekolah: idSekolahYgMauDicari}),
        UserDashboard.find({kode_sekolah: {'$elemMatch': {'$eq': idSekolahYgMauDicari}}})
      ])
      let dataSekolah = results[0]
      let temp = {
        jadwalIstirahat: [{
          istirahat1: dataSekolah.jumlah_istirahat.istirahat1 ? dataSekolah.jumlah_istirahat.istirahat1 : null,
          jam_istirahat: dataSekolah.jumlah_istirahat.istirahat1 ? (dataSekolah.jumlah_istirahat.istirahat1_start + '-' + dataSekolah.jumlah_istirahat.istirahat1_end) : '',
        }, {
          istirahat2: dataSekolah.jumlah_istirahat.istirahat2 ? dataSekolah.jumlah_istirahat.istirahat2 : null,
          jam_istirahat: dataSekolah.jumlah_istirahat.istirahat2 ? (dataSekolah.jumlah_istirahat.istirahat2_start + '-' + dataSekolah.jumlah_istirahat.istirahat2_end) : '',
        }, {
          istirahat3: dataSekolah.jumlah_istirahat.istirahat3 ? dataSekolah.jumlah_istirahat.istirahat3 : null,
          jam_istirahat: dataSekolah.jumlah_istirahat.istirahat3 ? (dataSekolah.jumlah_istirahat.istirahat3_start + '-' + dataSekolah.jumlah_istirahat.istirahat3_end) : '',
        }],
        namaSekolah: dataSekolah.nama_sekolah,
        pembagianHasil: {
          sap: dataSekolah.fee.length > 0 ? (dataSekolah.fee[dataSekolah.fee.length - 1].fee_sap.toString() + (dataSekolah.fee[dataSekolah.fee.length - 1].jenis_fee_sap  == 0 ? '%' : '')) : '',
          ski: dataSekolah.fee.length > 0 ? (dataSekolah.fee[dataSekolah.fee.length - 1].fee_ski.toString() + (dataSekolah.fee[dataSekolah.fee.length - 1].jenis_fee_ski  == 0 ? '%' : '')) : '',
          sekolah: dataSekolah.fee.length > 0 ? (dataSekolah.fee[dataSekolah.fee.length - 1].fee_sekolah.toString() + (dataSekolah.fee[dataSekolah.fee.length - 1].jenis_fee_sekolah  == 0 ? '%' : '')) : '',
        },
        _id: dataSekolah.kode_sekolah,
        fotoAdmin: []
      }
      for (var j = 0; j < results[2].length; j++) {
        temp.fotoAdmin.push(results[2][j]['foto'])
      }
      let dataJadwal = results[1]
      return {
        message: 'Request Success',
        data: {
          dataJadwal: dataJadwal,
          dataSekolah: temp
        },
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

module.exports = satuInformasiSekolah;
