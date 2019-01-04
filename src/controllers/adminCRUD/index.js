const deleteAdminFunc         = require('./delete')
const readAdminFunc           = require('./read')
const readOneAdminFunc        = require('./readOne')
const updateAdminFunc         = require('./update')
const createAdminFunc         = require('./create')

class AdminCRUD {
  static createAdmin (req, res, next) {
    try {
      createAdminFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: createAdmin',
        process: 'createAdmin',
        status: 'Request Failed'
      })
    }
  }
  static readAdmin (req, res, next) {
    try {
      readAdminFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readAdmin',
        process: 'readAdmin',
        status: 'Request Failed'
      })
    }
  }
  static readOneAdmin (req, res, next) {
    try {
      readOneAdminFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readOneAdmin',
        process: 'readOneAdmin',
        status: 'Request Failed'
      })
    }
  }
  static updateAdmin (req, res, next) {
    try {
      updateAdminFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: updateAdmin',
        process: 'updateAdmin',
        status: 'Request Failed'
      })
    }
  }
  static deleteAdmin (req, res, next) {
    try {
      deleteAdminFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: deleteAdmin',
        process: 'deleteAdmin',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = AdminCRUD;
