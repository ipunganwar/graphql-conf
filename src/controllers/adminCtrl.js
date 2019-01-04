const AdminCRUD = require('./adminCRUD')

class AdminCtrl {
  static async createAdmin(req, res, next) {
		AdminCRUD.createAdmin(req, res, next)
	}

	static async readAdmin(req, res, next) {
		AdminCRUD.readAdmin(req, res, next)
	}

  static async readOneAdmin(req, res, next) {
    AdminCRUD.readOneAdmin(req, res, next)
  }

	static async updateAdmin(req, res, next) {
		AdminCRUD.updateAdmin(req, res, next)
	}

	static async deleteAdmin(req, res, next) {
		AdminCRUD.deleteAdmin(req, res, next)
	}
}

module.exports = AdminCtrl
