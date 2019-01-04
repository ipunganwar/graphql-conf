const Sekolah          = require('../../models/').Sekolah
const checkAdminAccess = require('../../helpers/checkAdminAccess')

async function createSekolah (req, res, next) {
  if (!req.body._id || !req.body.nama_sekolah || !req.body.email || !req.body.kode_pos || !req.body.no_telp || !req.body.alamat_sekolah || !req.body.fee) {
    res.status(400).send({
      message: 'Bad Request, Some Required Params not exist',
      process: 'createSekolah',
      status: 'Request Failed'
    })
  } else {
    let level_user = req.tokenContent.level_user
    if(level_user === 0) {
      try {
        let newDataSekolah = await Sekolah.create({
          _id: req.body._id,
          nama_sekolah: req.body.nama_sekolah,
          password: req.body.password,
          jenjang: req.body.jenjang,
          no_telp: req.body.no_telp,
          alamat_sekolah: req.body.alamat_sekolah,
          kode_pos: req.body.kode_pos,
          koordinator: req.body.koordinator,
          email: req.body.email,
          jumlah_istirahat: {
            istirahat1: false,
            istirahat1_start: '',
            istirahat1_end: '',
            istirahat2: false,
            istirahat2_start: '',
            istirahat2_end: '',
            istirahat3: false,
            istirahat3_start: '',
            istirahat3_end: ''
          },
          potongan: [],
          waktu_transfer: '',
          rekening: req.body.rekening,
          fee: req.body.fee
        })
        res.status(200).send({
          data: newDataSekolah,
          message: 'Request Success',
          status: 'Request Success'
        })
      } catch (error) {
        res.status(500).send({
          message: 'Internal Server Error',
          process: 'createSekolah',
          status: 'Request Failed'
        })
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'createSekolah',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = createSekolah;
