const deletePencairanFunc = require('./delete')
const readPencairanFunc = require('./read')
const createPencairanFunc = require('./create')
const readOnePencairanFunc = require('./readOne')
const updatePencairanFunc = require('./update')

class PencairanCRUD {
  static createPencairan (req, res, next) {
    try {
      createPencairanFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: createPencairan')
    }
  }
  static readPencairan (req, res, next) {
    try {
      readPencairanFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: readPencairan')
    }
  }
  static readOnePencairan (req, res, next) {
    try {
      readOnePencairanFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readOnePencairan')
    }
  }
  static updatePencairan (req, res, next) {
    try {
      updatePencairanFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: updatePencairan')
    }
  }
  static deletePencairan (req, res, next) {
    try {
      deletePencairanFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: deletePencairan')
    }
  }
}

module.exports = PencairanCRUD;
