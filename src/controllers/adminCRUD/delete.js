const AdminModel = require('../../models/userDashboardModel')

async function deleteAdmin(req, res, next) {
  let level_user = req.tokenContent.level_user

  if(level_user === 0 && req.body._id != req.tokenContent._id) {
    try {
      let deletedDataAdmin = await AdminModel.findOneAndRemove({ _id: req.body._id })

      res.status(200).send({
        data: deletedDataAdmin,
        status: 'Request Success',
        message: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'deleteAdmin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'deleteAdmin'
    })
  }
}

module.exports = deleteAdmin;
