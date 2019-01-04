const Outlet                = require('../../models/').Outlet
const User                  = require('../../models/').User
const axios                 = require('axios')
const encrypt               = require('../../helpers/cryptoHelper')
const checkAdminAccess      = require('../../helpers/checkAdminAccess')

async function updateOutlet (req, res, next) {
  if (!req.body._id) {
    res.status(400).send({
      message: 'Bad Request _id Params not exist',
      process: 'updateOutlet',
      status: 'Request Failed'
    })
  } else {
    Outlet.findById(req.body._id).then((dataOutletValidation) => {
      let isAccessible = checkAdminAccess(dataOutletValidation.kode_sekolah, req.tokenContent, 'UPDATE')
      if (isAccessible) {
        let tempOutlet = {}
        let tempUser = {}
        if (req.body.password) {
          tempUser.password = encrypt(req.body.password)
        }
        if (req.body.nama_outlet) {
          tempOutlet.nama_outlet = req.body.nama_outlet
        }
        if (req.body.no_telepon) {
          tempOutlet.no_telepon = req.body.no_telepon
        }
        if (req.body.foto_pemilik) {
          tempOutlet.foto_pemilik = req.body.foto_pemilik
        }
        if (req.body.nama_pemilik) {
          tempOutlet.nama_pemilik = req.body.nama_pemilik
        }
        if (req.body.alamat_pemilik) {
          tempOutlet.alamat_pemilik = req.body.alamat_pemilik
        }
        if (req.body.email_pemilik) {
          tempOutlet.email_pemilik = req.body.email_pemilik
        }
        if (req.body.kode_perangkat) {
          tempOutlet.kode_perangkat = req.body.kode_perangkat
        }
        if (req.body.rekening) {
          tempOutlet.rekening = req.body.rekening
        }
        tempOutlet.$push = {
          riwayat_user: {
            tanggal_waktu: new Date(),
            alamat_ip: req.ip,
            kegiatan: 'Admin Mengupdate Data User'
          },
          notifikasi: {
            tanggal_waktu: new Date(),
            baca: 0,
            notifikasi: 'Hi, Admin baru saja mengupdate data anda silahkan laporkan kepada admin sekolahmu jika ada kesalahan update. Terima Kasih!'
          }
        }
        Outlet.findByIdAndUpdate(req.body._id, tempOutlet, {new: true}).then((dataOutlet) => {
          if (req.body.password) {
            if (req.body.username) {
              User.findOneAndUpdate({username: req.body.username}, tempUser).then((dataUser) => {
                res.status(200).send({
                  message: 'Request Success',
                  data: {
                    outlet: dataOutlet,
                    user: dataUser
                  },
                  status: 'Request Success'
                })
              }).catch((err) => {
                res.status(500).send({
                  message: 'There\'s some error when updating the password',
                  process: 'updateOutlet',
                  status: 'Request Failed'
                })
              })
            } else {
              res.status(400).send({
                message: 'Failed to update password, Username param not found',
                process: 'updateOutlet',
                status: 'Request Failed'
              })
            }
          } else {
            res.status(200).send({
              message: 'Request Success',
              data: {
                data: dataOutlet,
                dataUser: null
              },
              status: 'Request Success'
            })
          }
        }).catch((err) => {
          res.status(500).send({
            message: 'There\'s some error when updating',
            process: 'updateOutlet',
            status: 'Request Failed'
          })
        })
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'updateOutlet',
          status: 'Request Failed'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'There\'s some error when updating',
        process: 'updateOutlet',
        status: 'Request Failed'
      })
    })
  }
}

module.exports = updateOutlet;
