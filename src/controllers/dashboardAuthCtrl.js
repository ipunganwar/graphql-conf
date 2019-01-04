const UserDashboard = require('../models/').UserDashboard
var encrypt = require('../helpers/cryptoHelper')
var sendMail = require('../helpers/sendMail')
var generateRandomPassword = require('../helpers/generateRandomPassword')
var jwt = require('jsonwebtoken')

class AuthCtrl {
  static forgotPassword (req, res, next) {
    UserDashboard.findOne({email: req.body.email}).then((data) => {
      let newRandomPassword = generateRandomPassword()
      UserDashboard.findOneAndUpdate({email: req.body.email}, {password: encrypt(newRandomPassword)}).then((dataUser) => {
        res.status(200).send({
          message: 'Lupa password Success'
        })
        sendMail(req.body.email, dataUser.nama, newRandomPassword)
        UserDashboard.findOneAndUpdate({email: email}, {$push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'User Forgot Password'}}}).then((data) => {

        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err)
        res.status(400).send({
          message: 'Data user tidak ditemukan',
        })
      })
    }).catch((err) => {
      console.log(err)
      res.status(400).send({
        message: 'Email tidak ditemukan'
      })
    })
  }
  static updateAccount (req, res, next) {
    if (req.body._id && req.body.email && req.body.password && req.body.nama) {
      UserDashboard.findOneAndUpdate({_id: req.body._id}, {email: req.body.email, nama: req.body.nama, password: encrypt(req.body.password)}).then((data) => {
        res.status(200).send({
          message: 'Update Account Success',
          body: {
            data
          }
        })
        UserDashboard.findOneAndUpdate({email: email}, {$push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'User Update Account'}}}).then((data) => {

        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        res.status(400).send({
          message: 'Some Error when Updating Data'
        })
      })
    } else {
      res.status(500).send({
        message: 'Internal Server Error'
      })
    }
  }
  static doLogin (req, res, next) {
    let email = req.body.email
    let password = req.body.password
    UserDashboard.findOne({
      email: email
    }).then((data) => {
      password = encrypt(password)
      if (data.password === password) {
        var token = jwt.sign({
          email: data.email,
          level_user: data.level_user,
          kode_sekolah: data.kode_sekolah ? data.kode_sekolah : 'allinone',
          _id: data._id
        }, process.env.JWT_SALT);
        res.status(200).send({
          message: 'Login Success',
          data: {
            token,
            _id: data._id,
            nama: data.nama,
            email: data.email,
            level_user: data.level_user,
            foto: data.foto
          }
        })
        UserDashboard.findOneAndUpdate({email: email}, {$push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'User Login'}}}).then((data) => {

        }).catch((err) => {
          console.log(err);
        })
      } else {
        res.status(400).send({
          message: 'Login Gagal'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err
      })
    })
  }
  static doLogout (req, res, next) {
    // sama matiin token nanti kalo bisa
    let _id = jwt.verify(req.headers.token, process.env.JWT_SALT)._id
    UserDashboard.findOneAndUpdate({_id: _id}, {$push: {riwayat_user: {tanggal_waktu: new Date(), alamat_ip: req.ip, kegiatan: 'User Logout'}}}).then((data) => {
      res.send({
        message: 'Logout Success'
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  static create(req, res, next) {
    if (req.body.password) {
      req.body.password = encrypt(req.body.password)
    }
    UserDashboard.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      console.log(err);
      res.status(500).send({
        message: '' + err
      })
    })
  }
  static read(req, res, next) {
    UserDashboard.find().then((data) => {
      res.status(200).send(data)
      // res.status(200).send(encrypt('admin'))
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = AuthCtrl;
