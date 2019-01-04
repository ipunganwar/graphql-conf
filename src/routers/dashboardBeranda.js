const express = require('express')
const router = express.Router()
const BerandaCtrl = require('../controllers/berandaDashboardCtrl')

router.get('/totalBerandaKantinMenuPelanggan', BerandaCtrl.totalBerandaKantinMenuPelanggan)
router.get('/totalSaldoBeranda', BerandaCtrl.totalSaldoBeranda)
// router.post('/lupa_password', BerandaCtrl.forgotPassword)
// router.put('/', BerandaCtrl.updateAccount)
// router.post('/', BerandaCtrl.create)
// router.get('/', BerandaCtrl.read)

module.exports = router;
