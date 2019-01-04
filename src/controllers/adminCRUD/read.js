const AdminModel = require('../../models/userDashboardModel')

async function readAdmin(req, res, next) {
  let level_user = req.tokenContent.level_user
  if(level_user === 0) {
    try {
      let dataAdmin = await AdminModel.find()

      res.status(200).send({
        data: dataAdmin,
        status: 'Request Success',
        message: 'Request Success',
      })
    } catch (error) {
      res.status(500).send({
        errorMessage: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readAdmin'
      })
    }
  } else {
    try {
      let dataAdmin = await AdminModel.find({_id: req.tokenContent._id})

      res.status(200).send({
        data: dataAdmin,
        status: 'Request Success',
        message: 'Request Success',
      })
    } catch (error) {
      res.status(500).send({
        errorMessage: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readAdmin'
      })
    }
  }
}

module.exports = readAdmin;
