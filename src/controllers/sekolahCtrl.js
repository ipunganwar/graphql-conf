const SekolahCRUD  = require('./sekolahCRUD')

class SekolahCtrl {
  static async read (req, res, next) {
    SekolahCRUD.readSekolah(req, res, next)
  }

  static async readOne (req, res, next) {
    SekolahCRUD.readOneSekolah(req, res, next)
  }

  static async create (req, res, next) {
    SekolahCRUD.createSekolah(req, res, next)
  }

  static async update(req, res, next) {
    SekolahCRUD.updateSekolah(req, res, next)
  }
}

module.exports = SekolahCtrl
