const TopupCRUD = require('./topupCRUD')

class TopUpCtrl {
  static read (req, res, next) {
    TopupCRUD.readTopup(req, res, next)
  }
  static readOne (req, res, next) {
    TopupCRUD.readOneTopup(req, res, next)
  }
  static update (req, res, next) {
    TopupCRUD.updateTopup(req, res, next)
  }
  static delete (req, res, next) {
    TopupCRUD.deleteTopup(req, res, next)
  }
}

module.exports = TopUpCtrl;
