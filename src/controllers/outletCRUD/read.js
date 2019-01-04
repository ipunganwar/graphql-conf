const Outlet      = require('../../models/').Outlet
const User        = require('../../models/').User
const axios       = require('axios')

async function readOutlet (req, res, next) {
  let kode_sekolah = req.tokenContent.kode_sekolah
  let level_user = req.tokenContent.level_user
  let objectUntukSearchBerdasarkanSekolah = []
  for (var i = 0; i < kode_sekolah.length; i++) {
    objectUntukSearchBerdasarkanSekolah.push({
      kode_sekolah: kode_sekolah[i]
    })
  }
  let options = {}
  if (level_user === 0) {
    options = {}
  } else {
    options = {$or: [...objectUntukSearchBerdasarkanSekolah]}
  }
  Outlet.find(options).sort('nama_outlet').populate('kode_kantin kode_sekolah').then(async (data) => {
    let dataOutletWithUser = []
    for (var i = 0; i < data.length; i++) {
      let user = await User.find({kode_referensi: data[i]._id})
      let temp = JSON.parse(JSON.stringify(data[i]))
      temp.user = user
      dataOutletWithUser.push(temp)
    }
    res.send({
      message: 'Request Success',
      status: 'Request Success',
      data: dataOutletWithUser
    })
  }).catch((err) => {
    res.status(500).send({
      message: 'Internal Server Error',
      process: 'readOutlet',
      status: 'Request Failed'
    })
  })
}

module.exports = readOutlet;
