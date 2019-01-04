const readSekolahFunc           = require('./read')
const readOneSekolahFunc        = require('./readOne')
const updateSekolahFunc         = require('./update')
const createSekolahFunc         = require('./create')

class SekolahCRUD {
  static createSekolah (req, res, next) {
    try {
      createSekolahFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: createSekolah',
        process: 'createSekolah',
        status: 'Request Failed'
      })
    }
  }
  static readSekolah (req, res, next) {
    try {
      readSekolahFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readSekolah',
        process: 'readSekolah',
        status: 'Request Failed'
      })
    }
  }
  static readOneSekolah (req, res, next) {
    try {
      readOneSekolahFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readOneSekolah',
        process: 'readOneSekolah',
        status: 'Request Failed'
      })
    }
  }
  static updateSekolah (req, res, next) {
    try {
      updateSekolahFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: updateSekolah',
        process: 'updateSekolah',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = SekolahCRUD;
