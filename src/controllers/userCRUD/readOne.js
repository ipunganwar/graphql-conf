const Pelanggan        = require('../../models/').Pelanggan
const checkAdminAccess = require('../../helpers/checkAdminAccess')
function readOneUser (req, res, next) {
  if (req.query.id) {
    Pelanggan.findById(req.query.id).populate('kode_sekolah').then((data) => {
      let isAccessible = checkAdminAccess(data.kode_sekolah._id, req.tokenContent, 'READ')
      if (isAccessible) {
        res.send({
          status: 'Request Success',
          message: 'Request Success',
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
        process: 'readOneUser',
        status: 'Request Failed'
      })
    })
  } else {
    res.status(400).send({
      message: 'Bad Request, Query params id not exist',
      process: 'readOneUser',
      status: 'Request Failed'
    })
  }
}

module.exports = readOneUser;
