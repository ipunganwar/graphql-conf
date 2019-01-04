const Pelanggan = require('../../models/').Pelanggan
function readUser (req, res, next) {
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
  Pelanggan.find(options).populate('kode_sekolah').then((data) => {
    res.send({
      status: 'Request Success',
      message: 'Request Success',
      data
    })
  }).catch((err) => {
    res.status(500).send({
      message: 'There\'s some error in the server',
      process: 'readUser',
      status: 'Request Failed'
    })
  })
}

module.exports = readUser;
