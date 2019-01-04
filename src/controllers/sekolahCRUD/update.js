const Sekolah          = require('../../models/').Sekolah
const checkAdminAccess = require('../../helpers/checkAdminAccess')

async function updateSekolah(req, res, next) {
  if (!req.body._id) {
    res.status(400).send({
      message: 'Bad Request _id Params not exist',
      process: 'updateSekolah',
      status: 'Request Failed'
    })
  } else {
    let isAccessible = checkAdminAccess(req.body._id, req.tokenContent, 'UPDATE')
    if (isAccessible) {
      try {
        let tempDataSekolah = await Sekolah.findByIdAndUpdate(req.body._id)

        tempDataSekolah.nama_sekolah = req.body.nama_sekolah || tempDataSekolah.nama_sekolah,
        tempDataSekolah.password = req.body.password || tempDataSekolah.password,
        tempDataSekolah.jenjang =  req.body.jenjang || tempDataSekolah.jenjang,
        tempDataSekolah.no_telp =  req.body.no_telp || tempDataSekolah.no_telp,
        tempDataSekolah.alamat_sekolah =  req.body.alamat_sekolah || tempDataSekolah.alamat_sekolah,
        tempDataSekolah.kode_pos =  req.body.kode_pos || tempDataSekolah.kode_pos,
        tempDataSekolah.koordinator =  req.body.koordinator || tempDataSekolah.koordinator,
        tempDataSekolah.email =  req.body.email || tempDataSekolah.email,
        tempDataSekolah.jumlah_istirahat =  req.body.jumlah_istirahat || tempDataSekolah.jumlah_istirahat,
        tempDataSekolah.potongan =  req.body.potongan || tempDataSekolah.potongan,
        tempDataSekolah.waktu_transfer = req.body.waktu_transfer || tempDataSekolah.waktu_transfer,
        tempDataSekolah.rekening = req.body.rekening || tempDataSekolah.rekening,
        tempDataSekolah.fee = req.body.fee || tempDataSekolah.fee

        let newDataSekolah = await tempDataSekolah.save()

        res.status(200).send({
          data: newDataSekolah,
          message: 'Request Success',
          status: 'Request Success'
        })

      } catch (error) {
        res.status(500).send({
          message: 'Internal Server Error',
          process: 'updateSekolah',
          status: 'Request Failed'
        })
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'updateSekolah',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = updateSekolah;
