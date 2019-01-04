const Pencairan = require('../../models/').Pencairan
const Outlet = require('../../models/').Outlet
const Sekolah = require('../../models/').Sekolah
const axios = require('axios')

function createPencairan (req, res, next) {
  Outlet.findById(req.body.kode_outlet).populate('kode_sekolah').then((dataOutlet) => {
    let jumlah_fee_sap = 0
    let jumlah_fee_ski = 0
    let jumlah_fee_sekolah = 0
    let jumlah_transfer_kantin = req.body.saldo_kredit
    jumlah_fee_sap += ((req.body.saldo_kredit / 100) * dataOutlet.kode_sekolah.fee[0].fee_sap)
    jumlah_fee_ski += ((req.body.saldo_kredit / 100) * dataOutlet.kode_sekolah.fee[0].fee_ski)
    jumlah_fee_sekolah += ((req.body.saldo_kredit / 100) * dataOutlet.kode_sekolah.fee[0].fee_sekolah)
    jumlah_transfer_kantin -= jumlah_fee_sap
    jumlah_transfer_kantin -= jumlah_fee_ski
    jumlah_transfer_kantin -= jumlah_fee_sekolah
    let objSementara = {
      kode_outlet: req.body.kode_outlet,
      tanggal_pencairan: new Date(),
      saldo_kredit: req.body.saldo_kredit,
      fee_sekolah: jumlah_fee_sekolah,
      fee_ski: jumlah_fee_ski,
      fee_sap: jumlah_fee_sap,
      saldo_tunai: jumlah_transfer_kantin
    }
    let idPencairan = ''
    Pencairan.create(objSementara).then((dataPencairan) => {
      idPencairan = dataPencairan._id
      let url = process.env.WALLET_API+"?methods=pencairanOutlet"
      let data = JSON.stringify({
        kode_user: dataPencairan.kode_outlet,
        saldo_kredit: dataPencairan.saldo_kredit,
        kode_pencairan: dataPencairan._id
      })
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.X_API_KEY
        },
      }).then((dataAxios) => {
        res.send({
          message: 'Request Success',
          data: dataPencairan
        })
      }).catch((err) => {
        console.log(err)
        Pencairan.findByIdAndRemove(idPencairan).then((rollbackDelete) => {
          res.status(500).send({
            message: 'There\'s some error in the server'
          })
        })
      })
    }).catch((err) => {
      console.log('sini', err)
      Pencairan.findByIdAndRemove(idPencairan).then((rollbackDelete) => {
        res.status(500).send({
          message: 'There\'s some error in the server'
        })
      })
    })
  }).catch((err) => {
    console.log('sana', err)
    Pencairan.findByIdAndRemove(idPencairan).then((rollbackDelete) => {
      res.status(500).send({
        message: 'There\'s some error in the server'
      })
    })
  })
}

module.exports = createPencairan;
