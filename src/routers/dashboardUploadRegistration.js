const express = require('express')
const router = express.Router()
const UploadRegistrationCtrl = require('../controllers/uploadCtrl')
const isCredential    = require('../middlewares/verifyTokenAdmin')

router.post('/sekolah', isCredential, UploadRegistrationCtrl.sekolahRegistration)
router.post('/menu', isCredential, UploadRegistrationCtrl.menuRegistration)
router.post('/user', isCredential, UploadRegistrationCtrl.userRegistration)
router.post('/kantin', isCredential, UploadRegistrationCtrl.kantinRegistration)
router.post('/outlet', isCredential, UploadRegistrationCtrl.outletRegistration)

module.exports = router;
