const JadwalTutupCRUD = require('./jadwalTutupCRUD')

class JadwalTutupCtrl {
  static create (req, res, next) {
    JadwalTutupCRUD.createJadwalTutup(req, res, next)
  }
  static read (req, res, next) {
    JadwalTutupCRUD.readJadwalTutup(req, res, next)
  }
  static readBySekolah (req, res, next) {
    JadwalTutupCRUD.readBySekolahJadwalTutup(req, res, next)
  }
  static update (req, res, next) {
    JadwalTutupCRUD.updateJadwalTutup(req, res, next)
  }
  static delete (req, res, next) {
    JadwalTutupCRUD.deleteJadwalTutup(req, res, next)
  }
}

module.exports = JadwalTutupCtrl;
