const Pelanggan = require('../../../models/').Pelanggan
var encrypt = require('../../../helpers/cryptoHelper')
var axios = require('axios')

async function tambahStaffSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari, dataYgAkanDiinput) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    if (!dataYgAkanDiinput.email || !dataYgAkanDiinput.id || !dataYgAkanDiinput.alamat || !dataYgAkanDiinput.nip || !dataYgAkanDiinput.password || !dataYgAkanDiinput.foto || !dataYgAkanDiinput.nama) {
      return {
        message: 'Bad Request, Some Required Params not exist',
        status: 400
      }
    } else {
      try {
        let pelangganBaru = await Pelanggan.create({
          _id: dataYgAkanDiinput.id,
          kode_sekolah: idSekolahYgMauDicari,
          email: dataYgAkanDiinput.email,
          alamat: dataYgAkanDiinput.alamat,
          username: dataYgAkanDiinput.nip,
          telepon: dataYgAkanDiinput.telepon,
          password: encrypt(dataYgAkanDiinput.password),
          foto_pelanggan: dataYgAkanDiinput.foto,
          nama_pelanggan: dataYgAkanDiinput.nama,
          peran: 4,
          saldo: 0,
          notifikasi: [{
            tanggal_waktu: new Date(),
            notifikasi: 'Hi ' + dataYgAkanDiinput.nama + ', akun eKantin kamu baru saja terbuat. Jangan lupa pesan makanan pakai eKantin ya',
            baca: false
          }],
          riwayat_user: []
        })
        let url = process.env.WALLET_API+"?methods=tambahAkunWalletBaru"
        let data = JSON.stringify({
          kode_user: dataYgAkanDiinput.id,
        })
        let newData = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY
          },
        })
        return {
          message: 'Request Success',
          status: 200,
          data: pelangganBaru
        }
      } catch (e) {
        console.log('/src/controllers/manajemenUser/sekolahTerdaftar/tambahStaffSatuSekolahTerdaftar/:40', e);
        return {
          message: 'Internal Server Error',
          status: 500
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

module.exports = tambahStaffSatuSekolahTerdaftar;
