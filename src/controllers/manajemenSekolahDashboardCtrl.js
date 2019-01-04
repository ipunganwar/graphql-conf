var jwt = require('jsonwebtoken')
const informasiSekolah = require('./manajemenSekolah').informasiSekolah
const kantin = require('./manajemenSekolah').kantin
const pelajar = require('./manajemenSekolah').pelajar
const staff = require('./manajemenSekolah').staff

class ManajemenSekolahCtrl {
  static async listSekolahTerdaftar (req, res, next) {
    try {
      let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
      let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
      let listSekolahTerdaftar = await informasiSekolah.listSekolahTerdaftar(level_user, kode_sekolah)
      res.status(listSekolahTerdaftar.status).send({
        message: listSekolahTerdaftar.message,
        data: listSekolahTerdaftar.data
      })
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:18', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async satuInformasiSekolah (req, res, next) {
    try {
      if (req.query.id) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let satuInformasiSekolah = await informasiSekolah.satuInformasiSekolah(level_user, kode_sekolah, req.query.id)
        res.status(satuInformasiSekolah.status).send({
          message: satuInformasiSekolah.message,
          data: satuInformasiSekolah.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query id params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:40', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async ubahJadwalIstirahatSekolah (req, res, next) {
    try {
      if (req.query.id) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let ubahJadwalIstirahatSekolah = await informasiSekolah.ubahJadwalIstirahatSekolah(level_user, kode_sekolah, req.query.id, req.body)
        res.status(ubahJadwalIstirahatSekolah.status).send({
          message: ubahJadwalIstirahatSekolah.message,
          data: ubahJadwalIstirahatSekolah.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query id params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:62', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async ubahPembagianHasilSekolah (req, res, next) {
    try {
      if (req.query.id) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let ubahPembagianHasilSekolah = await informasiSekolah.ubahPembagianHasilSekolah(level_user, kode_sekolah, req.query.id, req.body)
        res.status(ubahPembagianHasilSekolah.status).send({
          message: ubahPembagianHasilSekolah.message,
          data: ubahPembagianHasilSekolah.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query id params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:84', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async tambahJadwalTutupSekolah (req, res, next) {
    try {
      if (req.query.id) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let tambahJadwalTutupSekolah = await informasiSekolah.tambahJadwalTutupSekolah(level_user, kode_sekolah, req.query.id, req.body)
        res.status(tambahJadwalTutupSekolah.status).send({
          message: tambahJadwalTutupSekolah.message,
          data: tambahJadwalTutupSekolah.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query id params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:84', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async listStaffSekolahTerdaftar (req, res, next) {
    try {
      if (req.query.id) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let listStaffSekolahTerdaftar = await staff.listStaffSekolahTerdaftar(level_user, kode_sekolah, req.query.id)
        res.status(listStaffSekolahTerdaftar.status).send({
          message: listStaffSekolahTerdaftar.message,
          data: listStaffSekolahTerdaftar.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query id params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:128', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async detailStaffSekolahTerdaftar (req, res, next) {
    try {
      if (req.query.idPelanggan) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let detailStaffSekolahTerdaftar = await staff.detailStaffSekolahTerdaftar(level_user, kode_sekolah, req.query.idPelanggan)
        res.status(detailStaffSekolahTerdaftar.status).send({
          message: detailStaffSekolahTerdaftar.message,
          data: detailStaffSekolahTerdaftar.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query idPelanggan params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:150', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async topupStaffSekolahTerdaftar (req, res, next) {
    try {
      if (req.query.idPelanggan) {
        let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
        let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
        let topupStaffSekolahTerdaftar = await staff.topupStaffSekolahTerdaftar(level_user, kode_sekolah, req.query.idPelanggan)
        res.status(topupStaffSekolahTerdaftar.status).send({
          message: topupStaffSekolahTerdaftar.message,
          data: topupStaffSekolahTerdaftar.data
        })
      } else {
        res.status(400).send({
          message: 'Bad Request, Query idPelanggan params not exist'
        })
      }
    } catch (err) {
      console.log('src/controllers/manajemenSekolahDashboardCtrl/:172', err);
      res.status(403).send({
        message: 'Forbidden'
      })
    }
  }
  static async listSiswaSekolahTerdaftar (req, res, next) {

  }
}

module.exports = ManajemenSekolahCtrl;
