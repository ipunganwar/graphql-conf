const Pencairan = require('../../models/').Pencairan
const axios = require('axios')

function readPencairan (req, res, next) {
  Pencairan.find({}).sort({'tanggal_pencairan': -1}).populate('kode_outlet').then((data) => {
    res.send({
      message: 'Request Success',
      data
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({
      message: 'There\'s some error in the server'
    })
  })
}

module.exports = readPencairan;
