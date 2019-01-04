const Sekolah = require('../../models/').Sekolah

async function readSekolah(req, res, next) {
  let kode_sekolah = req.tokenContent.kode_sekolah
  let level_user = req.tokenContent.level_user
  let objectUntukSearchBerdasarkanSekolah = []
  for (var i = 0; i < kode_sekolah.length; i++) {
    objectUntukSearchBerdasarkanSekolah.push({
      _id: kode_sekolah[i]
    })
  }
  let options = {}
  if (level_user === 0) {
    options = {}
  } else {
    options = {$or: [...objectUntukSearchBerdasarkanSekolah]}
  }
  try {
    let tempData = []
    let SekolahDatas = await Sekolah.find(options).populate('kode_pos')
    res.status(200).send({
      data: SekolahDatas,
      message: 'Request Success',
      status: 'Request Success'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      process: 'readSekolah',
      status: 'Request Failed'
    })
  }
}

module.exports = readSekolah;
