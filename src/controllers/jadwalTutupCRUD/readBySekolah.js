const JadwalTutup       = require('../../models/').JadwalTutup
const User              = require('../../models/').User
const axios             = require('axios')
const moment            = require('moment-timezone')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')

async function readBySekolahJadwalTutup (req, res, next) {
  let isAccessible = checkAdminAccess(req.query.kode_sekolah, req.tokenContent, 'READ')
  if (isAccessible) {
    JadwalTutup.find({kode_sekolah: req.query.kode_sekolah}).sort({tanggal_tutup: 1}).then((data) => {
      let returnedData = groupingJadwal(data)
      res.send({
        message: 'Request Success',
        status: 'Request Success',
        data: returnedData
      })
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error in the server',
        process: 'readBySekolahJadwalTutup',
        status: 'Request Failed'
      })
    })
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      process: 'readBySekolahJadwalTutup',
      status: 'Request Failed'
    })
  }
}

function groupingJadwal (data) {
  let groupedTanggalTutup = []
  for (var i = 0; i < data.length; i++) {
    let indexOfGroup = []
    for (var j = 0; j < groupedTanggalTutup.length; j++) {
      if (data[i].keterangan == groupedTanggalTutup[j].keterangan && data[i].label == groupedTanggalTutup[j].label) {
        indexOfGroup.push(j)
      }
    }
    if (indexOfGroup.length > 0) {
      for (var j = 0; j < indexOfGroup.length; j++) {
        let tanggalStart = moment.utc(groupedTanggalTutup[indexOfGroup[j]].start).tz('Asia/Jakarta')
        let tanggalEnd = moment.utc(groupedTanggalTutup[indexOfGroup[j]].end).tz('Asia/Jakarta')
        let tanggalCurrent = moment.utc(data[i].tanggal_tutup).tz('Asia/Jakarta')
        if(tanggalCurrent.diff(tanggalStart, 'days') == -1) {
          groupedTanggalTutup[indexOfGroup[j]].start = data[i].tanggal_tutup
          groupedTanggalTutup[indexOfGroup[j]].id = groupedTanggalTutup[indexOfGroup[j]].id + '###' + data[i]._id
        } else {
          if(tanggalCurrent.diff(tanggalEnd, 'days') == 1) {
            groupedTanggalTutup[indexOfGroup[j]].end = data[i].tanggal_tutup
            groupedTanggalTutup[indexOfGroup[j]].id = groupedTanggalTutup[indexOfGroup[j]].id + '###' + data[i]._id
          } else {
            if (j == indexOfGroup.length -1) {
              groupedTanggalTutup.push({
                id: data[i]._id,
                label: data[i].label,
                keterangan: data[i].keterangan,
                start: data[i].tanggal_tutup,
                end: data[i].tanggal_tutup,
                kode_sekolah: data[i].kode_sekolah
              })
            }
          }
        }
      }
    } else {
      groupedTanggalTutup.push({
        id: data[i]._id,
        label: data[i].label,
        keterangan: data[i].keterangan,
        start: data[i].tanggal_tutup,
        end: data[i].tanggal_tutup,
        kode_sekolah: data[i].kode_sekolah
      })
    }
  }
  return groupedTanggalTutup
}

module.exports = readBySekolahJadwalTutup;
