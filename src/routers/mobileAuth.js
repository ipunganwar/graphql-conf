const express = require('express')
const router = express.Router()
const MobileAuthCtrl = require('../controllers/mobileAuthCtrl')

router.post('/login', MobileAuthCtrl.doLogin)
router.post('/lupa_password', MobileAuthCtrl.forgotPassword)
router.post('/verif_password', MobileAuthCtrl.verifPassword)
router.post('/refreshDeviceToken', MobileAuthCtrl.refreshDeviceToken)
// router.post('/', MobileAuthCtrl.create)
// router.get('/', MobileAuthCtrl.read)

module.exports = router
