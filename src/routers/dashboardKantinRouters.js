const express          = require('express')
const router           = express.Router()
const KantinController = require('../controllers/kantinCtrl')
const isCredential = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, KantinController.create)
router.get('/', isCredential, KantinController.read)
router.get('/readOne', isCredential, KantinController.readOne)
router.put('/', isCredential, KantinController.update)
router.delete('/', isCredential, KantinController.delete)

module.exports = router
