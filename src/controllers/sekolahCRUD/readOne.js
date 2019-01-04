const Sekolah          = require('../../models/').Sekolah
const checkAdminAccess = require('../../helpers/checkAdminAccess')

async function readOneSekolah (req, res, next) {
  if (req.query.id) {
    let isAccessible = checkAdminAccess(req.query.id, req.tokenContent, 'READ')
    if (isAccessible) {
      try {
        let SekolahDatas = await Sekolah.findById(req.query.id).populate('kode_pos')
        res.status(200).send({
          data: SekolahDatas,
          message: 'Request Success',
          status: 'Request Success'
        })
      } catch (e) {
        res.status(500).send({
          message: 'Internal Server Error',
          process: 'readOneSekolah',
          status: 'Request Failed'
        })
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'readOneSekolah',
        status: 'Request Failed'
      })
    }
  } else {
    res.status(400).send({
      message: 'Bad Request, Query params id not exist',
      process: 'readOneSekolah',
      status: 'Request Failed'
    })
  }
}

module.exports = readOneSekolah
