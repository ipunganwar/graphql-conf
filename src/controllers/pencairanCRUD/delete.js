const Pencairan = require('../../models/').Pencairan
const axios = require('axios')

function deletePencairan (req, res, next) {
  Pencairan.findByIdAndRemove(req.body.kode_pencairan).then((data) => {
    res.send({
      message: 'Request Success',
      data
    })
  }).catch((err) => {
    res.status(500).send({
      message: 'There\'s some error in the server'
    })
  })
}

module.exports = deletePencairan;
