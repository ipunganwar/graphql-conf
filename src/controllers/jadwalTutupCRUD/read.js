const JadwalTutup = require('../../models/').JadwalTutup
const User = require('../../models/').User
const axios = require('axios')

async function readJadwalTutup (req, res, next) {
  JadwalTutup.find().sort({kode_sekolah: -1, tanggal_tutup: -1}).populate('kode_sekolah').then((data) => {
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

module.exports = readJadwalTutup;
