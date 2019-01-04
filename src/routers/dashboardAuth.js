const express = require('express')
const router = express.Router()
const DashboardAuthCtrl = require('../controllers/dashboardAuthCtrl')

router.post('/login', DashboardAuthCtrl.doLogin)
router.post('/logout', DashboardAuthCtrl.doLogout)
router.post('/lupa_password', DashboardAuthCtrl.forgotPassword)
router.put('/', DashboardAuthCtrl.updateAccount)
router.post('/', DashboardAuthCtrl.create)
router.get('/', DashboardAuthCtrl.read)

module.exports = router;
