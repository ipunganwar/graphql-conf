const express             = require('express')
const router              = express.Router()
const TransaksiController = require('../controllers/transaksiCtrl')
const isCredential        = require('../middlewares/verifyTokenAdmin')

router.get('/', isCredential, TransaksiController.readTransaksi)

module.exports = router
