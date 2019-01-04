const Pelanggan = require('../../models/').Pelanggan
var encrypt = require('../../helpers/cryptoHelper')
var randomStringGenerator = require('../../helpers/randomStringGenerator')
var axios = require('axios')

function createUser(req, res, next) {
  if (!req.body.email || !req.body.alamat || !req.body.kode_sekolah || !req.body.kelas || !req.body.nisn || !req.body.password || !req.body.foto || !req.body.nama || !req.body.peran) {
    res.status(400).send({
      message: 'Bad Request, Some Required Params not exist'
    })
  } else {
    let randomid = randomStringGenerator(12)
    Pelanggan.create({
      _id: randomid,
      kode_sekolah: req.body.kode_sekolah,
      email: req.body.email,
      alamat: req.body.alamat,
      kelas: req.body.kelas,
      username: req.body.nisn,
      telepon: req.body.telepon,
      password: encrypt(req.body.password),
      foto_pelanggan: req.body.foto,
      nama_pelanggan: req.body.nama,
      peran: req.body.peran,
      saldo: 0,
      notifikasi: [{
        tanggal_waktu: new Date(),
        notifikasi: 'Hi ' + req.body.nama + ', akun eKantin kamu baru saja terbuat. Jangan lupa pesan makanan pakai eKantin ya',
        baca: false
      }],
      riwayat_user: [{
        tanggal_waktu: new Date(),
        alamat_ip: req.ip,
        kegiatan: 'Admin Membuat User'
      }]
    }).then((pelangganBaru) => {
      let url = process.env.WALLET_API+"?methods=tambahAkunWalletBaru"
      let data = JSON.stringify({
        kode_user: randomid,
      })
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.X_API_KEY
        },
      }).then((newData) => {
        res.send({
          message: 'Request Success',
          data: pelangganBaru
        })
      }).catch((err) => {
        Pelanggan.findByIdAndRemove(randomid).then((success) => {
          res.status(500).send({
            message: 'There\'s some error in the server'
          })
        }).catch((err) => {
          res.status(500).send({
            message: 'There\'s some error in the server'
          })
        })
      })
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error in the server'
      })
    })
  }
}

module.exports = createUser;
