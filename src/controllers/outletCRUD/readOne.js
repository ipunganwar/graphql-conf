const Outlet            = require('../../models/').Outlet
const User              = require('../../models/').User
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

async function readOneOutlet (req, res, next) {
  if (req.query.id) {
    Outlet.findOne({_id: req.query.id}).populate('kode_kantin kode_sekolah').then(async(data) => {
      let isAccessible = checkAdminAccess(data.kode_sekolah._id, req.tokenContent, 'READ')
      if (isAccessible) {
        let user = await User.find({kode_referensi: data._id})
        let temp = JSON.parse(JSON.stringify(data))
        temp.user = user
        res.send({
          message: 'Request Success',
          data: temp,
          status: 'Request Success'
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'readOneOutlet',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        process: 'readOneOutlet',
        status: 'Request Failed'
      })
    })
  } else {
    res.status(400).send({
      message: 'Bad Request, Query params id not exist',
      process: 'readOneOutlet',
      status: 'Request Failed'
    })
  }
}

module.exports = readOneOutlet;
