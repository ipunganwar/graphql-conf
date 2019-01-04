const createUserFunc = require('./create')
const deleteUserFunc = require('./delete')
const readUserFunc = require('./read')
const readOneUserFunc = require('./readOne')
const updateUserFunc = require('./update')
const checkAdminAccess = require('../../helpers/checkAdminAccess')

class UserCRUD {
  static createUser (req, res, next) {
    try {
      let isAccessible = checkAdminAccess(req.body.kode_sekolah, req.tokenContent, 'CREATE')
      if (isAccessible) {
        createUserFunc(req, res, next)
      } else {
        res.status(403).send({
          message: 'Forbidden, you don\'t have access to do this action.',
          process: 'createUser',
          status: 'Request Failed'
        })
      }
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: createUser')
    }
  }
  static readUser (req, res, next) {
    try {
      readUserFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readUser')
    }
  }
  static readOneUser (req, res, next) {
    try {
      readOneUserFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: readOneUser')
    }
  }
  static updateUser (req, res, next) {
    try {
      updateUserFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: updateUser')
    }
  }
  static deleteUser (req, res, next) {
    try {
      deleteUserFunc(req, res, next)
    } catch (e) {
      res.status(500).send('There\'s some error in the server. \n Process: deleteUser')
    }
  }
}

module.exports = UserCRUD;
