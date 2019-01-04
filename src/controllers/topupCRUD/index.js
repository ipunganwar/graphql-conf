const deleteTopupFunc = require('./delete')
const readTopupFunc = require('./read')
const readOneTopupFunc = require('./readOne')
const updateTopupFunc = require('./update')

class TopupCRUD {
  static readTopup (req, res, next) {
    try {
      readTopupFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: readTopup')
    }
  }
  static readOneTopup (req, res, next) {
    try {
      readOneTopupFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readOneTopup')
    }
  }
  static updateTopup (req, res, next) {
    try {
      updateTopupFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: updateTopup')
    }
  }
  static deleteTopup (req, res, next) {
    try {
      deleteTopupFunc(req, res, next)
    } catch (e) {
      console.log(e)
      res.status(500).send('There\'s some error in the server. \n Process: deleteTopup')
    }
  }
}

module.exports = TopupCRUD;
