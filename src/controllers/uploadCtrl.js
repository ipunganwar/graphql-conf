const uploadRegistration = require('./uploadRegistration')

class UploadRegistrationCtrl {
  static sekolahRegistration (req, res, next) {
    let level_user = req.tokenContent.level_user
    if (level_user === 0) {
      if (!req.body.file_url) {
        res.status(400).send({
          message: 'File Not Found',
          process: 'sekolahUploadRegistration',
          status: 'Request Failed'
        })
      } else {
        try {
          uploadRegistration.sekolah.sekolahRegistration(req, res, next)
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server. \n Process: sekolahUploadRegistration',
            process: 'sekolahUploadRegistration',
            status: 'Request Failed'
          })
        }
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'sekolahUploadRegistration',
        status: 'Request Failed'
      })
    }
  }
  static kantinRegistration (req, res, next) {
    let level_user = req.tokenContent.level_user
    if (level_user === 0) {
      if (!req.body.file_url) {
        res.status(400).send({
          message: 'File Not Found',
          process: 'kantinUploadRegistration',
          status: 'Request Failed'
        })
      } else {
        try {
          uploadRegistration.kantin.kantinRegistration(req, res, next)
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server. \n Process: kantinUploadRegistration',
            status: 'Request Failed',
            process: 'kantinUploadRegistration',
          })
        }
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'kantinUploadRegistration',
        status: 'Request Failed'
      })
    }
  }
  static userRegistration (req, res, next) {
    let level_user = req.tokenContent.level_user
    if (level_user === 0) {
      if (!req.body.file_url) {
        res.status(400).send({
          message: 'File Not Found',
          process: 'userUploadRegistration',
          status: 'Request Failed'
        })
      } else {
        try {
          uploadRegistration.user.userRegistration(req, res, next)
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server. \n Process: userUploadRegistration',
            process: 'userUploadRegistration',
            status: 'Request Failed'
          })
        }
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'userUploadRegistration',
        status: 'Request Failed'
      })
    }
  }
  static menuRegistration (req, res, next) {
    let level_user = req.tokenContent.level_user
    if (level_user === 0) {
      if (!req.body.file_url) {
        res.status(400).send({
          message: 'File Not Found',
          process: 'menuUploadRegistration',
          status: 'Request Failed'
        })
      } else {
        try {
          uploadRegistration.menu.menuRegistration(req, res, next)
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server. \n Process: menuUploadRegistration',
            process: 'menuUploadRegistration',
            status: 'Request Failed'
          })
        }
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'menuUploadRegistration',
        status: 'Request Failed'
      })
    }
  }
  static outletRegistration (req, res, next) {
    let level_user = req.tokenContent.level_user
    if (level_user === 0) {
      if (!req.body.file_url) {
        res.status(400).send({
          message: 'File Not Found',
          process: 'outletUploadRegistration',
          status: 'Request Failed'
        })
      } else {
        try {
          uploadRegistration.outlet.outletRegistration(req, res, next)
        } catch (e) {
          res.status(500).send({
            message: 'There\'s some error in the server. \n Process: outletUploadRegistration',
            process: 'outletUploadRegistration',
            status: 'Request Failed'
          })
        }
      }
    } else {
      res.status(403).send({
        message: 'Forbidden, you don\'t have access to do this action.',
        process: 'outletUploadRegistration',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = UploadRegistrationCtrl;
