const Topup             = require('../../models/').Topup
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

function readOneTopup (req, res, next) {
  if (req.query.id) {
    Topup.findById(req.query.id).populate('kode_pelanggan').then((data) => {
      let isAccessible = checkAdminAccess(data.kode_pelanggan.kode_sekolah, req.tokenContent, 'READ')
      if (isAccessible) {
        res.send({
          message: 'Request Success',
          status: 'Request Success',
          data
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'readOneUser',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error in the server',
        status: 'Request Failed',
        process: 'topupReadOne'
      })
    })
  } else {
    res.status(400).send({
      message: 'Bad Request, Query params id not exist',
      status: 'Request Failed',
      process: 'topupReadOne'
    })
  }
}

module.exports = readOneTopup;
