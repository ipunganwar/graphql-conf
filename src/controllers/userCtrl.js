const UserCRUD = require('./userCRUD')

class UserCtrl {
  static create (req, res, next) {
    UserCRUD.createUser(req, res, next)
  }
  static read (req, res, next) {
    UserCRUD.readUser(req, res, next)
  }
  static readOne (req, res, next) {
    UserCRUD.readOneUser(req, res, next)
  }
  static update (req, res, next) {
    UserCRUD.updateUser(req, res, next)
  }
  static delete (req, res, next) {
    UserCRUD.deleteUser(req, res, next)
  }
}

module.exports = UserCtrl;
