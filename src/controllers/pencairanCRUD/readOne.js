const Pencairan = require('../../models/').Pencairan
const axios = require('axios')

function readOnePencairan (req, res, next) {
  if (req.query.id) {
    Pencairan.findById(req.query.id).populate('kode_outlet').then((data) => {
      res.send({
        message: 'Request Success',
        data
      })
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error in the server'
      })
    })
  } else {
    res.status(400).send({
      message: 'Bad Request, Query params id not exist'
    })
  }
}

module.exports = readOnePencairan;
