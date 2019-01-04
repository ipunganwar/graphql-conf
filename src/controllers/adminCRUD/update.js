const AdminModel = require('../../models/').UserDashboard
const encrypt    = require('../../helpers/cryptoHelper')

async function updateAdmin(req, res, next) {
  let level_user = req.tokenContent.level_user

  if(level_user === 0 || req.body._id == req.tokenContent._id) {
    let objTemp = {}
    if (req.body.nama) {
      objTemp.nama = req.body.nama
    }
    if (req.body.email) {
      objTemp.email = req.body.email
    }
    if (req.body.level_user && level_user === 0) {
      objTemp.level_user = req.body.level_user
    }
    if (req.body.foto) {
      objTemp.foto = req.body.foto
    }
    if (req.body.telepon) {
      objTemp.telepon = req.body.telepon
    }
    if (req.body.alamat) {
      objTemp.alamat = req.body.alamat
    }
    if (req.body.kode_sekolah && level_user === 0) {
      objTemp.kode_sekolah = req.body.kode_sekolah
    }
    if (req.body.password) {
      objTemp.password = encrypt(req.body.password)
    }
    try {
      let newDataAdmin = await AdminModel.findByIdAndUpdate(req.body._id, objTemp, {new: true})

      res.status(200).send({
        data: newDataAdmin,
        status: 'Request Success',
        message: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'updateAdmin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'updateAdmin'
    })
  }
}

module.exports = updateAdmin;
