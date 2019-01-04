const OutletCRUD = require('./outletCRUD')

class OutletCtrl {
  static create (req, res, next) {
    OutletCRUD.createOutlet(req, res, next)
  }
  static read (req, res, next) {
    OutletCRUD.readOutlet(req, res, next)
  }
  static readOne (req, res, next) {
    OutletCRUD.readOneOutlet(req, res, next)
  }
  static update (req, res, next) {
    OutletCRUD.updateOutlet(req, res, next)
  }
  static delete (req, res, next) {
    OutletCRUD.deleteOutlet(req, res, next)
  }
}

module.exports = OutletCtrl;
