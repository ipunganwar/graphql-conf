const JadwalTutup       = require('../../models/').JadwalTutup
const User              = require('../../models/').User
const axios             = require('axios')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')
const moment            = require('moment-timezone')

async function createJadwalTutup (req, res, next) {
  if (!req.body.kode_sekolah) {
    res.status(400).send({
      message: 'Bad Request, kode_sekolah params not exist',
      process: 'createJadwalTutup',
      status: 'Request Failed'
    })
  }
  if (!req.body.start) {
    res.status(400).send({
      message: 'Bad Request, start params not exist',
      process: 'createJadwalTutup',
      status: 'Request Failed'
    })
  }
  if (!req.body.end) {
    res.status(400).send({
      message: 'Bad Request, end params not exist',
      process: 'createJadwalTutup',
      status: 'Request Failed'
    })
  }
  let isAccessible = checkAdminAccess(req.body.kode_sekolah, req.tokenContent, 'CREATE')
  if (isAccessible) {
    let ungroupedJadwal = unGroupingJadwal(req.body)
    for (var i = 0; i < ungroupedJadwal.length; i++) {
      let objSementara = {
        kode_sekolah: ungroupedJadwal[i].kode_sekolah,
        tanggal_tutup: ungroupedJadwal[i].tanggal_tutup,
        keterangan: ungroupedJadwal[i].keterangan,
        label: ungroupedJadwal[i].label
      }
      let tanggal = new Date(objSementara.tanggal_tutup)
      let tanggalKurangDari = new Date(tanggal)
      tanggalKurangDari.setDate(tanggal.getDate() + 1)
      try {
        dataCreate = await JadwalTutup.create(objSementara)
      } catch (e) {
        res.status(500).send({
          message: 'There\'s some error in the server',
          process: 'createJadwalTutup',
          status: 'Request Failed'
        })
      }
    }
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
      process: 'createJadwalTutup',
      status: 'Request Failed'
    })
  }
}

function unGroupingJadwal(data) {
  let tanggalStart = moment.utc(data.start).tz('Asia/Jakarta')
  let tanggalEnd = moment.utc(data.end).tz('Asia/Jakarta')
  let diffOfDate = tanggalEnd.diff(tanggalStart, 'days')
  if(diffOfDate > 0) {
    let ungrouped = []
    for (var i = 0; i <= diffOfDate; i++) {
      let tempMomentObject = moment.utc(tanggalStart).add(i, 'days').tz('Asia/Jakarta')
      let temp = {
        kode_sekolah: data.kode_sekolah,
        tanggal_tutup: tempMomentObject,
        keterangan: data.keterangan,
        label: data.label
      }
      ungrouped.push(temp)
    }
    return ungrouped
  } else if(diffOfDate == 0) {
    return [{
      kode_sekolah: data.kode_sekolah,
      tanggal_tutup: tanggalStart,
      keterangan: data.keterangan,
      label: data.label
    }]
  } else {
    return 'error'
  }
}

module.exports = createJadwalTutup;
