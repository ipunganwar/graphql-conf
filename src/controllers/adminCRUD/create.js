const jwt        = require('jsonwebtoken')
const AdminModel = require('../../models/userDashboardModel')
const encrypt    = require('../../helpers/cryptoHelper')

async function createAdmin(req, res, next) {
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Bad Request, Some Required Params not exist',
      status: 'Request Failed',
      process: 'createAdmin'
    })
  } else {
    if(req.body.level_user == 0 || req.body.level_user == 1 || req.body.level_user == 2) {
      let level_user = req.tokenContent.level_user
      if(level_user === 0) {
        let tempDataAdmin = new AdminModel({
          nama: req.body.nama,
          email: req.body.email,
          password: encrypt(req.body.password),
          level_user: req.body.level_user,
          foto: req.body.foto,
          telepon: req.body.telepon,
          alamat: req.body.alamat,
          kode_sekolah: req.body.kode_sekolah,
          riwayat_user: []
        })

        try {
          let newDataAdmin = await tempDataAdmin.save()

          res.status(200).send({
            data: newDataAdmin,
            status: 'Request Success',
            message: 'Request Success',
          })
        } catch (error) {
          res.status(500).send({
            message: 'Internal Server Error',
            status: 'Request Failed',
            process: 'createAdmin'
          })
        }
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          status: 'Request Failed',
          process: 'createAdmin'
        })
      }
    } else {
      res.status(400).send({
        message: 'Bad Request, Some Required Params not exist',
        status: 'Request Failed',
        process: 'createAdmin'
      })
    }
  }
}

module.exports = createAdmin;
