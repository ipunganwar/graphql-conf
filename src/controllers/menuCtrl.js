const MenuCRUD = require('./menuCRUD')

class MenuController {
  static async create(req, res, next) {
    MenuCRUD.createMenu(req, res, next)
  }

  static async read(req, res, next) {
    MenuCRUD.readMenu(req, res, next)
  }

  static async readOne(req, res, next) {
    MenuCRUD.readOneMenu(req, res, next)
  }

  static async update(req, res, next) {
    MenuCRUD.updateMenu(req, res, next)
  }

  static async delete(req, res, next) {
    MenuCRUD.deleteMenu(req, res, next)
  }
}

module.exports = MenuController
