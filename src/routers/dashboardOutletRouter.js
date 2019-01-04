const express = require('express')
const router = express.Router()
const OutletCtrl = require('../controllers/outletCtrl')
const isCredential = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, OutletCtrl.create)
router.get('/', isCredential, OutletCtrl.read)
router.get('/readOne', isCredential, OutletCtrl.readOne)
router.put('/', isCredential, OutletCtrl.update)
router.delete('/', isCredential, OutletCtrl.delete)

module.exports = router;
