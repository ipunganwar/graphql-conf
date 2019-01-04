var jwt = require('jsonwebtoken')
const sekolahTerdaftar = require('./manajemenUser').sekolahTerdaftar
const administrator = require('./manajemenUser').administrator
const tambahSekolahBaru = require('./manajemenUser').tambahSekolahBaru
const UserDashboard = require('../models/').UserDashboard
const Sekolah = require('../models/').Sekolah

class ManajemenUserCtrl {
  static async listSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    let listSekolahTerdaftar = await sekolahTerdaftar.listSekolahTerdaftar(level_user, kode_sekolah)
    res.status(listSekolahTerdaftar.status).send({
      message: listSekolahTerdaftar.message,
      data: listSekolahTerdaftar.data
    })
  }
  static async satuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let satuSekolahTerdaftar = await sekolahTerdaftar.satuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(satuSekolahTerdaftar.status).send({
        message: satuSekolahTerdaftar.message,
        data: satuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async ubahSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let ubahSatuSekolahTerdaftar = await sekolahTerdaftar.ubahSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(ubahSatuSekolahTerdaftar.status).send({
        message: ubahSatuSekolahTerdaftar.message,
        data: ubahSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async listAdministratorSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let listAdministratorSatuSekolahTerdaftar = await sekolahTerdaftar.listAdministratorSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(listAdministratorSatuSekolahTerdaftar.status).send({
        message: listAdministratorSatuSekolahTerdaftar.message,
        data: listAdministratorSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async listSiswaSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let listSiswaSatuSekolahTerdaftar = await sekolahTerdaftar.listSiswaSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(listSiswaSatuSekolahTerdaftar.status).send({
        message: listSiswaSatuSekolahTerdaftar.message,
        data: listSiswaSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async listStaffSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let listStaffSatuSekolahTerdaftar = await sekolahTerdaftar.listStaffSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(listStaffSatuSekolahTerdaftar.status).send({
        message: listStaffSatuSekolahTerdaftar.message,
        data: listStaffSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async tambahStaffSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let tambahStaffSatuSekolahTerdaftar = await sekolahTerdaftar.tambahStaffSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(tambahStaffSatuSekolahTerdaftar.status).send({
        message: tambahStaffSatuSekolahTerdaftar.message,
        data: tambahStaffSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async satuStaffSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let satuStaffSatuSekolahTerdaftar = await sekolahTerdaftar.satuStaffSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(satuStaffSatuSekolahTerdaftar.status).send({
        message: satuStaffSatuSekolahTerdaftar.message,
        data: satuStaffSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async ubahStaffSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let ubahStaffSatuSekolahTerdaftar = await sekolahTerdaftar.ubahStaffSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(ubahStaffSatuSekolahTerdaftar.status).send({
        message: ubahStaffSatuSekolahTerdaftar.message,
        data: ubahStaffSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async tambahSiswaSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let tambahSiswaSatuSekolahTerdaftar = await sekolahTerdaftar.tambahSiswaSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(tambahSiswaSatuSekolahTerdaftar.status).send({
        message: tambahSiswaSatuSekolahTerdaftar.message,
        data: tambahSiswaSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async satuSiswaSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let satuSiswaSatuSekolahTerdaftar = await sekolahTerdaftar.satuSiswaSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
      res.status(satuSiswaSatuSekolahTerdaftar.status).send({
        message: satuSiswaSatuSekolahTerdaftar.message,
        data: satuSiswaSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async ubahSiswaSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let ubahSiswaSatuSekolahTerdaftar = await sekolahTerdaftar.ubahSiswaSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(ubahSiswaSatuSekolahTerdaftar.status).send({
        message: ubahSiswaSatuSekolahTerdaftar.message,
        data: ubahSiswaSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async tambahAdministratorSatuSekolahTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (req.query.id) {
      let tambahAdministratorSatuSekolahTerdaftar = await sekolahTerdaftar.tambahAdministratorSatuSekolahTerdaftar(level_user, kode_sekolah, req.query.id, req.body)
      res.status(tambahAdministratorSatuSekolahTerdaftar.status).send({
        message: tambahAdministratorSatuSekolahTerdaftar.message,
        data: tambahAdministratorSatuSekolahTerdaftar.data
      })
    } else {
      res.status(400).send({
        message: 'Bad Request, Query Params id not exist'
      })
    }
  }
  static async listAdministratorTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (typeof level_user === 'number') {
      let listDataAdmin = await administrator.listAdministratorTerdaftar(level_user, kode_sekolah)
      res.status(listDataAdmin.status).send({
        message: listDataAdmin.message,
        data: listDataAdmin.data
      })
    } else {
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async tambahAdministratorBaru (req, res, next) {
    if (!req.body.nama || !req.body.email || !req.body.password || !req.body.level_user || !req.body.telepon || !req.body.alamat) {
      res.status(400).send({
        message: 'Bad Request, Some Parameters not exist'
      })
    }
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    if (typeof level_user === 'number') {
      let administratorBaru = await administrator.tambahAdministratorBaru(level_user, req.body)
      res.status(administratorBaru.status).send({
        message: administratorBaru.message,
        data: administratorBaru.data
      })
    } else {
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async satuAdministratorTerdaftar (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let _id = jwt.verify(req.headers.token, process.env.JWT_SALT)._id
    let idAdminYgMauDicari = req.query.id
    if (idAdminYgMauDicari) {
      if (typeof level_user === 'number') {
        let dataAdmin = await administrator.satuAdministratorTerdaftar(level_user, _id, idAdminYgMauDicari)
        res.status(dataAdmin.status).send({
          message: dataAdmin.message,
          data: dataAdmin.data
        })
      } else {
        res.status(403).send({
          message: 'Forbidden'
        })
      }
    } else {
      res.status(400).send({
        message: 'Bad Request, Query id params not exist'
      })
    }
  }
  static async updateSatuAdministrator (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    if (req.body._id) {
      if (typeof level_user === 'number') {
        let dataAdminUpdated = await administrator.updateSatuAdministrator(level_user, req.body)
        res.status(dataAdminUpdated.status).send({
          message: dataAdminUpdated.message,
          data: dataAdminUpdated.data
        })
      } else {
        res.status(403).send({
          message: 'Forbidden'
        })
      }
    } else {
      res.status(400).send({
        message: 'Bad Request, id params not exist'
      })
    }
  }
  static async tambahSekolahBaru (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    if (typeof level_user === 'number') {
      let sekolahBaru = await tambahSekolahBaru.tambahSekolahBaru(level_user, req.body)
      res.status(sekolahBaru.status).send({
        message: sekolahBaru.message,
        data: sekolahBaru.data
      })
    } else {
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
}

module.exports = ManajemenUserCtrl;
