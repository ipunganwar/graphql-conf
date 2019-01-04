const AdminModel = require('../../models/userDashboardModel')

async function readOneAdmin(req, res, next) {
  let level_user = req.tokenContent.level_user

  if (level_user === 0 || req.tokenContent._id == req.query.id) {
    try {
      let dataAdmin = await AdminModel.findById(req.query.id).populate('kode_sekolah')

      res.status(200).send({
        status: 'Request Success',
        message: 'Request Success',
        data: dataAdmin
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readOneAdmin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'readOneAdmin'
    })
  }
}

module.exports = readOneAdmin;
