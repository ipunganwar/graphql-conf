const JadwalTutup       = require('../../models/').JadwalTutup
const User              = require('../../models/').User
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')
const moment            = require('moment-timezone')

async function deleteJadwalTutup (req, res, next) {
  if (!req.body.kode_sekolah) {
    res.status(400).send({
      message: 'Bad Request, kode_sekolah params not exist',
      process: 'deleteJadwalTutup',
      status: 'Request Failed'
    })
  }
  if (!req.body._id) {
    res.status(400).send({
      message: 'Bad Request, _id params not exist',
      process: 'deleteJadwalTutup',
      status: 'Request Failed'
    })
  }
  let isAccessible = checkAdminAccess(req.body.kode_sekolah, req.tokenContent, 'DELETE')
  if (isAccessible) {
    let id = req.body._id.split('###')
    for (var i = 0; i < id.length; i++) {
      let data = await JadwalTutup.findByIdAndRemove(id[i])
    }
    // for (var i = 0; i < ungroupedJadwal.length; i++) {
    //   let objSementara = {
    //     kode_sekolah: ungroupedJadwal[i].kode_sekolah,
    //     tanggal_tutup: ungroupedJadwal[i].tanggal_tutup
    //   }
    //   let tanggal = new Date(objSementara.tanggal_tutup)
    //   let tanggalKurangDari = new Date(tanggal)
    //   tanggalKurangDari.setDate(tanggal.getDate() + 1)
    //   JadwalTutup.find({kode_sekolah: objSementara.kode_sekolah, tanggal_tutup: {$gte: tanggal, $lt: tanggalKurangDari}}).then(async(jadwalTutupExist) => {
    //     if (jadwalTutupExist.length) {
    //       try {
    //         dataDelete = await JadwalTutup.remove({kode_sekolah: objSementara.kode_sekolah, tanggal_tutup: {$gte: tanggal, $lt: tanggalKurangDari}})
    //       } catch (e) {
    //         res.status(500).send({
    //           message: 'There\'s some error in the server',
    //           process: 'deleteJadwalTutup',
    //           status: 'Request Failed'
    //         })
    //       }
    //     }
    //   }).catch((err) => {
    //     res.status(500).send({
    //       message: 'There\'s some error in the server',
    //       process: 'deleteJadwalTutup',
    //       status: 'Request Failed'
    //     })
    //   })
    // }
    JadwalTutup.find({kode_sekolah: req.body.kode_sekolah}).sort({tanggal_tutup: 1}).populate('kode_sekolah').then((data) => {
      res.send({
        message: 'Request Success',
        status: 'Request Success',
        data
      })
    })
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      process: 'deleteJadwalTutup',
      status: 'Request Failed'
    })
  }
}

module.exports = deleteJadwalTutup;
