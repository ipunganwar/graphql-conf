const Kantin = require('../../models').Kantin
const KantinIdGenerator = require('../../helpers/autoGenerateIdKantin')

async function createKantin (req, res, next) {
  const level_user = req.tokenContent.level_user

  if(level_user === 0) {
    try {
      let tempKantinData = new Kantin({
        _id: await KantinIdGenerator(),
        tanggal_register: new Date(),
        nama_kantin: req.body.nama_kantin,
        no_telepon: req.body.no_telepon,
        foto_kantin: req.body.foto_kantin
      })
      let newKantinData = await tempKantinData.save()
      res.status(200).send({
        data: newKantinData,
        message: 'Request Success',
        status: 'Request Success'
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'createKantin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'createKantin'
    })
  }
}

module.exports = createKantin;
