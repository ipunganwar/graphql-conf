const Pelanggan         = require('../../models/').Pelanggan
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

function deleteUser (req, res, next) {
  if (!req.body.kode_pelanggan) {
    res.status(400).send({
      message: 'Bad Request kode_pelanggan Params not exist',
      process: 'deleteUser',
      status: 'Request Failed'
    })
  } else {
    Pelanggan.findById(req.body.kode_pelanggan).select('kode_sekolah').then((dataPelangganValidation) => {
      let isAccessible = checkAdminAccess(dataPelangganValidation.kode_sekolah._id, req.tokenContent, 'DELETE')
      if (isAccessible) {
        Pelanggan.findByIdAndRemove(req.body.kode_pelanggan).then((dataPelangganYgTerdelete) => {
          let url = process.env.WALLET_API+"?methods=deleteAkunWallet"
          let data = JSON.stringify({
            kode_user: req.body.kode_pelanggan,
          })
          axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            },
          }).then((dataAxiosPost) => {
            res.status(200).send({
              message: 'Request Success',
              data: dataPelangganYgTerdelete,
              status: 'Request Success'
            })
          }).catch((err) => {
            res.status(500).send({
              message: 'Internal Server Error',
              process: 'deleteUser',
              status: 'Request Failed'
            })
          })
        }).catch((err) => {
          res.status(500).send({
            message: 'Internal Server Error',
            process: 'deleteUser',
            status: 'Request Failed'
          })
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'updateUser',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error when updating',
        process: 'deleteUser',
        status: 'Request Failed'
      })
    })
  }
}

module.exports = deleteUser;
