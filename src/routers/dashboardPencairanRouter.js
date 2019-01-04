const express = require('express')
const router = express.Router()
const PencairanCtrl = require('../controllers/pencairanCtrl')
const isCredential = require('../middlewares/verifyTokenAdmin')

router.get('/', isCredential, PencairanCtrl.read)
router.post('/', isCredential, PencairanCtrl.create)
router.get('/readOne', isCredential, PencairanCtrl.readOne)
router.put('/', isCredential, PencairanCtrl.update)
router.delete('/', isCredential, PencairanCtrl.delete)

module.exports = router;
