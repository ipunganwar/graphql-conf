const Kantin = require('../../models').Kantin

async function updateKantin (req, res, next) {
  const level_user = req.tokenContent.level_user
  if(level_user === 0) {
    try {
      let tempDataKantin = await Kantin.findById(req.body._id)
      tempDataKantin.nama_kantin = req.body.nama_kantin || tempDataKantin.nama_kantin,
      tempDataKantin.no_telepon = req.body.no_telepon || tempDataKantin.no_telepon,
      tempDataKantin.foto_kantin =  req.body.foto_kantin || tempDataKantin.foto_kantin
      let newDataKantin = await tempDataKantin.save()
      res.status(200).send(newDataKantin)
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'updateKantin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'updateKantin'
    })
  }
}

module.exports = updateKantin;
