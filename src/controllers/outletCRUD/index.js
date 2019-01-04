const deleteOutletFunc = require('./delete')
const readOutletFunc = require('./read')
const readOneOutletFunc = require('./readOne')
const updateOutletFunc = require('./update')
const createOutletFunc = require('./create')

class OutletCRUD {
  static createOutlet (req, res, next) {
    try {
      createOutletFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: createOutlet')
    }
  }
  static readOutlet (req, res, next) {
    try {
      readOutletFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: readOutlet')
    }
  }
  static readOneOutlet (req, res, next) {
    try {
      readOneOutletFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readOneOutlet')
    }
  }
  static updateOutlet (req, res, next) {
    try {
      updateOutletFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: updateOutlet')
    }
  }
  static deleteOutlet (req, res, next) {
    try {
      deleteOutletFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: deleteOutlet')
    }
  }
}

module.exports = OutletCRUD;
