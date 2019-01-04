const KantinCRUD = require('./kantinCRUD')

class KantinController {
  static async create(req, res, next) {
    KantinCRUD.createKantin(req, res, next)
  }

  static async read(req, res, next) {
    KantinCRUD.readKantin(req, res, next)
  }

  static async readOne(req, res, next) {
    KantinCRUD.readOneKantin(req, res, next)
  }

  static async update(req, res, next) {
    KantinCRUD.updateKantin(req, res, next)
  }

  static async delete(req, res, next) {
    KantinCRUD.deleteKantin(req, res, next)
  }
}

module.exports = KantinController
