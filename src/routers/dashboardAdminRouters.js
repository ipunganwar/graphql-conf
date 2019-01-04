const express         = require('express')
const router          = express.Router()
const AdminController = require('../controllers/adminCtrl')
const isCredential    = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, AdminController.createAdmin)
router.get('/', isCredential, AdminController.readAdmin)
router.put('/', isCredential, AdminController.updateAdmin)
router.delete('/', isCredential, AdminController.deleteAdmin)
router.get('/readOne', isCredential, AdminController.readOneAdmin)

module.exports = router
