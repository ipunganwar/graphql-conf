const express = require('express')
const router = express.Router()
const TabletAuthCtrl = require('../controllers/tabletAuthCtrl')

router.post('/login', TabletAuthCtrl.doLogin)
router.post('/lupa_password', TabletAuthCtrl.forgotPassword)
// router.get('/', MobileAuthCtrl.read)

module.exports = router;
