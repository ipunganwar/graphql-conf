const express       = require('express')
const router        = express.Router()
const TopupCtrl     = require('../controllers/topupCtrl')
const isCredential  = require('../middlewares/verifyTokenAdmin')

router.get('/', isCredential, TopupCtrl.read)
router.get('/readOne', isCredential, TopupCtrl.readOne)
router.put('/', isCredential, TopupCtrl.update)
router.delete('/', isCredential, TopupCtrl.delete)

module.exports = router;
