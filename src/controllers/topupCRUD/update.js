const Topup             = require('../../models/').Topup
const Pelanggan         = require('../../models/').Pelanggan
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')
const pushNotifHelper   = require('../../helpers/pushNotif')

function updateTopupFunc (req, res, next) {
  Topup.findById(req.body.kode_topup).populate('kode_pelanggan kode_pelanggan.kode_sekolah').then((dataTopupValidation) => {
    let isAccessible = checkAdminAccess(dataTopupValidation.kode_pelanggan.kode_sekolah, req.tokenContent, 'UPDATE')
    if (isAccessible) {
      Topup.findOneAndUpdate({_id: req.body.kode_topup, status: 0}, {status: req.body.status}, {new: true}).populate('kode_pelanggan').then((dataTopupMongo) => {
        if (dataTopupMongo && dataTopupMongo.status == 1) {
          let url = process.env.WALLET_API+"?methods=topupPelanggan"
          let data = JSON.stringify({
            kode_user: dataTopupMongo.kode_pelanggan._id,
            saldo_topup: dataTopupMongo.saldo_topup,
            kode_topup: dataTopupMongo._id
          })
          axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            },
          }).then((dataAxios) => {
            pushNotifHelper(dataTopupMongo.kode_pelanggan._id, 'Topup Saldo Sukses', 'Anda Sukses Melakukan Topup Sebesar Rp.100000')
            res.send({
              message: 'Request Success',
              status: 'Request Success',
              data: dataTopupMongo
            })
          }).catch((err)=> {
            Topup.findOneAndUpdate({_id: req.body.kode_topup}, {status: 0}, {new: true}).then((resetData) => {
              res.status(500).send({
                message: 'There\'s some error in the server',
                process: 'topupUpdate',
                status: 'Request Failed'
              })
            })
          })
        } else {
          pushNotifHelper(dataTopupMongo.kode_pelanggan._id, 'Topup Saldo Sukses', 'Anda Sukses Melakukan Topup Sebesar Rp.100000')
          res.send({
            message: 'Request Success',
            status: 'Request Success',
            data: dataTopupMongo
          })
        }
      }).catch((err) => {
        Topup.findOneAndUpdate({_id: req.body.kode_topup}, {status: 0}, {new: true}).then((resetData) => {
          res.status(500).send({
            message: 'There\'s some error in the server',
            process: 'topupUpdate',
            status: 'Request Failed'
          })
        })
      })
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'topupUpdate',
        status: 'Request Failed'
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: 'Internal Server Error',
      process: 'topupUpdate',
      status: 'Request Failed'
    })
  })
}

module.exports = updateTopupFunc;
