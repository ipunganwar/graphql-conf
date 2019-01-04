const express       = require('express')
const router        = express.Router()
const SekolahCtrl   = require('../controllers/sekolahCtrl')
const isCredential  = require('../middlewares/verifyTokenAdmin')

router.get('/', isCredential, SekolahCtrl.read)
router.get('/readOne', isCredential, SekolahCtrl.readOne)
router.post('/', isCredential, SekolahCtrl.create)
router.put('/', isCredential, SekolahCtrl.update)

module.exports = router
