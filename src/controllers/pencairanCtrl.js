const jwt = require('jsonwebtoken')
const PencairanCRUD = require('./pencairanCRUD')

class PencairanCtrl {
  static create (req, res, next) {
    PencairanCRUD.createPencairan(req, res, next)
  }
  static read (req, res, next) {
    PencairanCRUD.readPencairan(req, res, next)
  }
  static readOne (req, res, next) {
    PencairanCRUD.readOnePencairan(req, res, next)
  }
  static update (req, res, next) {
    PencairanCRUD.updatePencairan(req, res, next)
  }
  static delete (req, res, next) {
    PencairanCRUD.deletePencairan(req, res, next)
  }
}

module.exports = PencairanCtrl;
