const deleteMenuFunc         = require('./delete')
const readMenuFunc           = require('./read')
const readOneMenuFunc        = require('./readOne')
const updateMenuFunc         = require('./update')
const createMenuFunc         = require('./create')

class MenuCRUD {
  static createMenu (req, res, next) {
    try {
      createMenuFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: createMenu',
        process: 'createMenu',
        status: 'Request Failed'
      })
    }
  }
  static readMenu (req, res, next) {
    try {
      readMenuFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readMenu',
        process: 'readMenu',
        status: 'Request Failed'
      })
    }
  }
  static readOneMenu (req, res, next) {
    try {
      readOneMenuFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: readOneMenu',
        process: 'readOneMenu',
        status: 'Request Failed'
      })
    }
  }
  static updateMenu (req, res, next) {
    try {
      updateMenuFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: updateMenu',
        process: 'updateMenu',
        status: 'Request Failed'
      })
    }
  }
  static deleteMenu (req, res, next) {
    try {
      deleteMenuFunc(req, res, next)
    } catch (e) {
      res.status(500).send({
        message: 'There\'s some error in the server. \n Process: deleteMenu',
        process: 'deleteMenu',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = MenuCRUD;
