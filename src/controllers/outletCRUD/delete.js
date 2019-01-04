const Outlet                = require('../../models/').Outlet
const User                  = require('../../models/').User
const axios                 = require('axios')
const checkAdminAccess      = require('../../helpers/checkAdminAccess')

function deleteOutlet (req, res, next) {
  if (!req.body.kode_outlet) {
    res.status(400).send({
      message: 'Bad Request kode_outlet Params not exist',
      process: 'deleteOutlet',
      status: 'Request Failed'
    })
  } else {
    Outlet.findById(req.body._id).then((dataOutletValidation) => {
      let isAccessible = checkAdminAccess(dataOutletValidation.kode_sekolah, req.tokenContent, 'UPDATE')
      if (isAccessible) {
        Outlet.findByIdAndRemove(req.body.kode_outlet).then((dataOutlet) => {
          User.findOneAndRemove({kode_referensi: req.body.kode_outlet}).then((dataUser) => {
            let url = process.env.WALLET_API+"?methods=deleteAkunWallet"
            let data = JSON.stringify({
              kode_user: req.body.kode_outlet,
            })
            axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.X_API_KEY
              },
            }).then((dataAxiosPost) => {
              res.status(200).send({
                message: 'Request Success',
                data: {
                  outlet: dataOutlet,
                  user: dataUser
                },
                status: 'Request Success'
              })
            }).catch((err) => {
              res.status(500).send({
                message: 'Internal Server Error',
                process: 'deleteOutlet',
                status: 'Request Failed'
              })
            })
          }).catch((err) => {
            res.status(500).send({
              message: 'Internal Server Error',
              process: 'deleteOutlet',
              status: 'Request Failed'
            })
          })
        }).catch((err) => {
          res.status(500).send({
            message: 'Internal Server Error',
            process: 'deleteOutlet',
            status: 'Request Failed'
          })
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'deleteOutlet',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error when updating',
        process: 'deleteOutlet',
        status: 'Request Failed'
      })
    })
  }
}

module.exports = deleteOutlet;
