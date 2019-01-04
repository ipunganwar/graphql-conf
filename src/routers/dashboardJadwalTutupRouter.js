const express = require('express')
const router = express.Router()
const JadwalTutupCtrl = require('../controllers/jadwalTutupCtrl')
const isCredential = require('../middlewares/verifyTokenAdmin')

router.post('/', isCredential, JadwalTutupCtrl.create)
router.get('/', isCredential, JadwalTutupCtrl.read)
router.put('/', isCredential, JadwalTutupCtrl.update)
router.get('/readBySekolah', isCredential, JadwalTutupCtrl.readBySekolah)
router.delete('/', isCredential, JadwalTutupCtrl.delete)

module.exports = router;
