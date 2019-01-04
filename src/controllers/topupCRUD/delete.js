const Topup             = require('../../models/').Topup
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

function deleteTopup (req, res, next) {
  Topup.findById(req.body.kode_topup).populate('kode_pelanggan kode_pelanggan.kode_sekolah').then((dataTopupValidation) => {
    let isAccessible = checkAdminAccess(dataTopupValidation.kode_pelanggan.kode_sekolah, req.tokenContent, 'READ')
    if (isAccessible) {
      Topup.findOneAndRemove({_id: req.body.kode_topup, status: 0}).populate('kode_pelanggan').then((dataTopupYgTerdelete) => {
        res.status(200).send({
          message: 'Request Success',
          status: 'Request Success',
          data: dataTopupYgTerdelete
        })
      }).catch((err) => {
        res.status(500).send({
          message: 'Internal Server Error',
          process: 'topupDelete',
          status: 'Request Failed'
        })
      })
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'topupDelete',
        status: 'Request Failed'
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: 'Internal Server Error',
      process: 'topupDelete',
      status: 'Request Failed'
    })
  })
}

module.exports = deleteTopup;
