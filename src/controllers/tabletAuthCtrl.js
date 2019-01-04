const Outlet = require('../models/').Outlet
const User = require('../models/').User
var encrypt = require('../helpers/cryptoHelper')
var sendMail = require('../helpers/sendMail')
var generateRandomPassword = require('../helpers/generateRandomPassword')
var jwt = require('jsonwebtoken')

class AuthCtrl {
  static forgotPassword (req, res, next) {
    Outlet.findOne({email_pemilik: req.body.email}).then((dataOutlet) => {
      let newRandomPassword = generateRandomPassword()
      User.findOneAndUpdate({kode_referensi: dataOutlet._id}, {password: encrypt(newRandomPassword)}).then((dataUser) => {
        res.status(200).send({
          message: 'Lupa password Success'
        })
        sendMail(req.body.email, dataOutlet.nama_pemilik, newRandomPassword)
      }).catch((err) => {
        res.status(400).send({
          message: 'User tidak ditemukan',
        })
      })
    }).catch((err) => {
      res.status(400).send({
        message: 'Outlet tidak ditemukan'
      })
    })
  }
  static doLogin (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    User.findOne({
      username: username
    }).then((data) => {
      password = encrypt(password)
      if (data.password === password) {
        Outlet.findOne({_id: data.kode_referensi, kode_perangkat: req.body.kode_perangkat}).then((dataOutlet) => {
          var token = jwt.sign({
            username: data.username,
            kode_outlet: dataOutlet._id
          }, process.env.JWT_SALT)
          res.status(200).send({
            message: 'Login Success',
            token
          })
        }).catch((err) => {
          res.status(400).send({
            message: 'Login Gagal',
            err
          })
        })
      } else {
        res.status(400).send({
          message: 'Login Gagal'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'Login Gagal',
        err
      })
    })
  }
}

module.exports = AuthCtrl;
