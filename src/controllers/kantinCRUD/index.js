const deleteKantinFunc         = require('./delete')
const readKantinFunc           = require('./read')
const readOneKantinFunc        = require('./readOne')
const updateKantinFunc         = require('./update')
const createKantinFunc         = require('./create')

class KantinCRUD {
  static createKantin (req, res, next) {
    try {
      createKantinFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: createKantin',
        process: 'createKantin',
        status: 'Request Failed'
      })
    }
  }
  static readKantin (req, res, next) {
    try {
      readKantinFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readKantin',
        process: 'readKantin',
        status: 'Request Failed'
      })
    }
  }
  static readOneKantin (req, res, next) {
    try {
      readOneKantinFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readOneKantin',
        process: 'readOneKantin',
        status: 'Request Failed'
      })
    }
  }
  static updateKantin (req, res, next) {
    try {
      updateKantinFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: updateKantin',
        process: 'updateKantin',
        status: 'Request Failed'
      })
    }
  }
  static deleteKantin (req, res, next) {
    try {
      deleteKantinFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: deleteKantin',
        process: 'deleteKantin',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = KantinCRUD;
