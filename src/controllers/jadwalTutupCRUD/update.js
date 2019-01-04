const JadwalTutup       = require('../../models/').JadwalTutup
const User              = require('../../models/').User
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

async function updateJadwalTutup (req, res, next) {
  if (!req.body._id) {
    res.status(400).send({
      message: 'Bad Request, _id params not exist',
      process: 'updateJadwalTutup',
      status: 'Request Failed'
    })
  } else {
    let id = req.body._id.split('###')
    JadwalTutup.find({_id: id[0]}).then(async(dataJadwalValidation) => {
      let isAccessible = checkAdminAccess(dataJadwalValidation.kode_sekolah, req.tokenContent, 'UPDATE')
      if (isAccessible) {
        let temp = {}
        if (req.body.keterangan) {
          temp.keterangan = req.body.keterangan
        }
        if (req.body.label) {
          temp.label = req.body.label
        }
        try {
          let listData = []
          for (var i = 0; i < id.length; i++) {
            let data = await JadwalTutup.findByIdAndUpdate(id[i], temp, {new: true})
            listData.push(data)
          }
          res.send({
            message: 'Request Success',
            status: 'Request Success',
            data: listData
          })
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server',
            process: 'updateJadwalTutup',
            status: 'Request Failed'
          })
        }
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'updateJadwalTutup',
          status: 'Request Failed'
        })
      }
    })
  }
}

module.exports = updateJadwalTutup;
