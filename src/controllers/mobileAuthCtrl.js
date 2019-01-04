const Pelanggan = require('../models/').Pelanggan
var encrypt = require('../helpers/cryptoHelper')
var sendMail = require('../helpers/sendMail')
var generateRandomPassword = require('../helpers/generateRandomPassword')
var verifyTokenPelanggan = require('../helpers/verifyTokenPelanggan')
var jwt = require('jsonwebtoken')

class AuthCtrl {
  static forgotPassword (req, res, next) {
    Pelanggan.findOne({email: req.body.email}).then((data) => {
      let newRandomPassword = generateRandomPassword()
      Pelanggan.findOneAndUpdate({email: req.body.email}, {password: encrypt(newRandomPassword), $push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'Pelanggan Forgot Password'}}}).then((dataUser) => {
        sendMail(req.body.email, dataUser.nama_pelanggan, newRandomPassword)
        res.status(200).send({
          message: 'Lupa password Success'
        })
      }).catch((err) => {
        console.log(err)
        res.status(400).send({
          message: 'User tidak ditemukan',
        })
      })
    }).catch((err) => {
      console.log(err)
      res.status(400).send({
        message: 'Outlet tidak ditemukan'
      })
    })
  }
  static verifPassword (req, res, next) {
    if (req.headers.token && req.body.password) {
      let token = req.headers.token
      let password = req.body.password
      let user_id = verifyTokenPelanggan(token)
      Pelanggan.findOne({
        _id: user_id
      }).then((dataPelanggan) => {
        password = encrypt(password)
        if (dataPelanggan.password === password) {
          res.status(200).send({
            message: 'Password Verified',
            status: 1
          })
        } else {
          res.status(400).send({
            message: 'Bad Request, password not match',
            status: 0
          })
        }
      }).catch((err) => {
        res.status(500).send({
          message: 'Internal Server Error',
          err
        })
      })
    } else {
      if (!req.headers.token) {
        res.status(400).send({
          message: 'Bad Request, token not exist'
        })
      }
      if (!req.body.password) {
        res.status(400).send({
          message: 'Bad Request, password not exist'
        })
      }
    }
  }
  static doLogin (req, res, next) {
    let username = req.body.username
    let password = req.body.password

    Pelanggan.findOne({
      username: username
    }).then((data) => {
      password = encrypt(password)
      if (data.password === password) {
        var token = jwt.sign({
          username: data.username,
          peran: data.peran,
          kode_pelanggan: data.kode_pelanggan
        }, process.env.JWT_SALT);
        let isFirstLogin = true
        for (var i = 0; i < data.riwayat_user.length; i++) {
          if (data.riwayat_user[i].kegiatan.toLowerCase().indexOf('login') > -1) {
            isFirstLogin = false
            break;
          }
        }
        Pelanggan.findOneAndUpdate({_id: data.kode_pelanggan}, {$push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'Pelanggan Login'}}}).then((dataPelangganRiwayat) => {
          res.status(200).send({
            message: 'Login Success',
            firstLogin: isFirstLogin,
            token
          })
        })
      } else {
        res.status(403).send({
          message: 'Login Gagal'
        })
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Internal Server Error',
        err
      })
    })
  }
  static refreshDeviceToken(req, res, next) {
    let user_id = verifyTokenPelanggan(req.headers.token)
    Pelanggan.findOneAndUpdate({_id: user_id}, {device_token: req.body.firebaseToken}, {new: true}).then((data) => {
      res.status(200).send({
        message: 'Refresh Device Token Success',
        firebaseToken: data.device_token
      })
    }).catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err
      })
    })
  }
  // static create(req, res, next) {
  //   Pelanggan.create(req.body).then((data) => {
  //     res.status(200).send(data)
  //   }).catch((err) => {
  //     res.status(500).send({
  //       message: '' + err
  //     })
  //   })
  // }
  // static read(req, res, next) {
  //   Pelanggan.read().then((data) => {
  //     res.status(200).send(data)
  //   }).catch((err) => {
  //     res.status(500).send(err)
  //   })
  // }
}

module.exports = AuthCtrl;
