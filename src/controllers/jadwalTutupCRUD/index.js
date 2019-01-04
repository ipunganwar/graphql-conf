const deleteJadwalTutupFunc = require('./delete')
const readJadwalTutupFunc = require('./read')
const readBySekolahJadwalTutupFunc = require('./readBySekolah')
const updateJadwalTutupFunc = require('./update')
const createJadwalTutupFunc = require('./create')

class JadwalTutupCRUD {
  static createJadwalTutup (req, res, next) {
    try {
      createJadwalTutupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: createJadwalTutup')
    }
  }
  static readJadwalTutup (req, res, next) {
    try {
      readJadwalTutupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readJadwalTutup')
    }
  }
  static readBySekolahJadwalTutup (req, res, next) {
    try {
      readBySekolahJadwalTutupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readBySekolahJadwalTutup')
    }
  }
  static updateJadwalTutup (req, res, next) {
    try {
      updateJadwalTutupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: updateJadwalTutup')
    }
  }
  static deleteJadwalTutup (req, res, next) {
    try {
      deleteJadwalTutupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: deleteJadwalTutup')
    }
  }
}

module.exports = JadwalTutupCRUD;
