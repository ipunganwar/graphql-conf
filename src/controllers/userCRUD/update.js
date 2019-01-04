const Pelanggan         = require('../../models/').Pelanggan
const encrypt           = require('../../helpers/cryptoHelper')
const dateCreator       = require('../../helpers/dateCreator')
const checkAdminAccess  = require('../../helpers/checkAdminAccess')
function updateUser (req, res, next) {
  if (!req.body._id) {
    res.status(400).send({
      message: 'Bad Request _id Params not exist',
      process: 'updateUser',
      status: 'Request Failed'
    })
  } else {
    Pelanggan.findById(req.body._id).select('kode_sekolah').then((dataPelangganValidation) => {
      let isAccessible = checkAdminAccess(dataPelangganValidation.kode_sekolah._id, req.tokenContent, 'UPDATE')
      if (isAccessible) {
        let temp = {}
        if (req.body.password) {
          temp.password = encrypt(req.body.password)
        }
        if (req.body.telepon) {
          temp.telepon = req.body.telepon
        }
        if (req.body.email) {
          temp.email = req.body.email
        }
        if (req.body.alamat) {
          temp.alamat = req.body.alamat
        }
        if (req.body.kelas) {
          temp.kelas = req.body.kelas
        }
        if (req.body.nisn) {
          temp.username = req.body.nisn
        }
        if (req.body.nama) {
          temp.nama_pelanggan = req.body.nama
        }
        if (req.body.peran) {
          temp.peran = req.body.peran
        }
        if (req.body.foto) {
          temp.foto_pelanggan = req.body.foto
        }
        temp.$push = {
          riwayat_user: {
            tanggal_waktu: dateCreator(),
            alamat_ip: req.ip,
            kegiatan: 'Admin Mengupdate Data User'
          },
          notifikasi: {
            tanggal_waktu: dateCreator(),
            baca: 0,
            notifikasi: 'Hi, Admin baru saja mengupdate data anda silahkan laporkan kepada admin sekolahmu jika ada kesalahan update. Terima Kasih!'
          }
        }
        Pelanggan.findByIdAndUpdate(req.body._id, temp, {new: true}).then((data) => {
          res.status(200).send({
            message: 'Request Success',
            data: data,
            status: 'Request Success'
          })
        }).catch((err) => {
          res.status(500).send({
            message: 'There\'s some error when updating',
            process: 'updateUser',
            status: 'Request Failed'
          })
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'updateUser',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error when updating',
        process: 'updateUser',
        status: 'Request Failed'
      })
    })
  }
}

module.exports = updateUser;
