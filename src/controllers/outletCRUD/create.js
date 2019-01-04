const Outlet                = require('../../models/').Outlet
const User                  = require('../../models/').User
const JadwalMenu            = require('../../models/').JadwalMenu
const Menu                  = require('../../models/').Menu
const autoGenerateIdOutlet  = require('../../helpers/autoGenerateIdOutlet')
const encrypt               = require('../../helpers/cryptoHelper')
const axios                 = require('axios')
const checkAdminAccess      = require('../../helpers/checkAdminAccess')

async function createOutlet (req, res, next) {
  if (!req.body.kode_kantin || !req.body.kode_sekolah || !req.body.nama_outlet || !req.body.no_telepon || !req.body.foto_pemilik || !req.body.nama_pemilik || !req.body.alamat_pemilik || !req.body.email_pemilik || !req.body.kode_perangkat || !req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Bad Request, Some Required Params not exist',
      process: 'createOutlet',
      status: 'Request Failed'
    })
  } else {
    let isAccessible = checkAdminAccess(req.body.kode_sekolah, req.tokenContent, 'CREATE')
    if (isAccessible) {
      let idOutlet = await autoGenerateIdOutlet(req.body.kode_kantin, req.body.kode_sekolah)
      Outlet.create({
        _id: idOutlet,
        kode_kantin: req.body.kode_kantin,
        kode_sekolah: req.body.kode_sekolah,
        nama_outlet: req.body.nama_outlet,
        no_telepon: req.body.no_telepon,
        foto_pemilik: req.body.foto_pemilik,
        nama_pemilik: req.body.nama_pemilik,
        alamat_pemilik: req.body.alamat_pemilik,
        email_pemilik: req.body.email_pemilik,
        saldo: 0,
        status: 0,
        kode_perangkat: req.body.kode_perangkat,
        rekening: req.body.rekening,
        notifikasi: [{
          tanggal_waktu: new Date(),
          notifikasi: 'Hi ' + req.body.nama_outlet + ', akun eKantin kamu baru saja terbuat. Jangan lupa untuk cek pesanan makanan setiap hari ya',
          baca: false
        }],
        riwayat_user: [{
          tanggal_waktu: new Date(),
          alamat_ip: req.ip,
          kegiatan: 'Admin Membuat Outlet'
        }]
      }).then((dataOutletBaru) => {
        User.create({
          username: req.body.username,
          password: encrypt(req.body.password),
          kode_referensi: idOutlet,
          tipe_user: 0
        }).then((dataUserOutletBaru) => {
          let url = process.env.WALLET_API+"?methods=tambahAkunWalletBaru"
          let data = JSON.stringify({
            kode_user: idOutlet,
          })
          axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            },
          }).then((newData) => {
            Menu.find({
              kode_kantin: dataOutletBaru.kode_kantin
            }).then((dataMenu) => {
              let tempJadwalMenu = []
              for (var i = 0; i < dataMenu.length; i++) {
                let objJadwalMenu = {
                  kode_outlet: dataOutletBaru._id,
                  kode_menu: dataMenu[i]._id,
                  tanggal_penetapan: new Date(),
                  istirahat1: true,
                  istirahat2: true,
                  istirahat3: true,
                  senin: true,
                  selasa: true,
                  rabu: true,
                  kamis: true,
                  jumat: true,
                  sabtu: true,
                  minggu: true,
                }
                tempJadwalMenu.push(JadwalMenu.create(objJadwalMenu))
              }
              Promise.all(tempJadwalMenu).then((dataJadwalMenuBaru) => {
                res.send({
                  message: 'Request Success',
                  data: {
                    outlet: dataOutletBaru,
                    userOutlet: dataUserOutletBaru
                  },
                  status: 'Request Success'
                })
              })
            })
          }).catch((err) => {
            Outlet.findByIdAndRemove(idOutlet).then((removedOutlet) => {
              User.findOneAndRemove({username: req.body.username, kode_referensi: idOutlet}).then((removedUserOutlet) => {
                res.status(500).send({
                  message: 'There\'s some error in the server',
                  process: 'createOutlet',
                  status: 'Request Failed'
                })
              })
            })
          })
        }).catch((err) => {
          Outlet.findByIdAndRemove(idOutlet).then((removedOutlet) => {
            User.findOneAndRemove({username: req.body.username, kode_referensi: idOutlet}).then((removedUserOutlet) => {
              res.status(500).send({
                message: 'There\'s some error in the server',
                process: 'createOutlet',
                status: 'Request Failed'
              })
            })
          })
        })
      }).catch((err) => {
        Outlet.findByIdAndRemove(idOutlet).then((removedOutlet) => {
          User.findOneAndRemove({username: req.body.username, kode_referensi: idOutlet}).then((removedUserOutlet) => {
            res.status(500).send({
              message: 'There\'s some error in the server',
              process: 'createOutlet',
              status: 'Request Failed'
            })
          })
        })
      })
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'createOutlet',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = createOutlet;
