const express        = require('express')
const router         = express.Router()
const MenuController = require('../controllers/menuCtrl')
const isCredential  = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, MenuController.create)
router.get('/', isCredential, MenuController.read)
router.get('/readOne', isCredential, MenuController.readOne)
router.put('/', isCredential, MenuController.update)
router.delete('/', isCredential, MenuController.delete)

module.exports = router
