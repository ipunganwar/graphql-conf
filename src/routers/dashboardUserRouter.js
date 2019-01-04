const express         = require('express')
const router          = express.Router()
const UserCtrl        = require('../controllers/userCtrl')
const isCredential    = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, UserCtrl.create)
router.get('/', isCredential, UserCtrl.read)
router.get('/readOne', isCredential, UserCtrl.readOne)
router.put('/', isCredential, UserCtrl.update)
router.delete('/', isCredential, UserCtrl.delete)

module.exports = router;
