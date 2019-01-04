const express = require('express')
const router = express.Router()
const ManajemenSekolahCtrl = require('../controllers/manajemenSekolahDashboardCtrl')

//informasiSekolah
router.get('/listSekolahTerdaftar', ManajemenSekolahCtrl.listSekolahTerdaftar)
router.get('/satuInformasiSekolah', ManajemenSekolahCtrl.satuInformasiSekolah)
router.put('/ubahJadwalIstirahatSekolah', ManajemenSekolahCtrl.ubahJadwalIstirahatSekolah)
router.put('/ubahPembagianHasilSekolah', ManajemenSekolahCtrl.ubahPembagianHasilSekolah)
router.post('/tambahJadwalTutupSekolah', ManajemenSekolahCtrl.tambahJadwalTutupSekolah)
//staff
router.get('/listStaffSekolahTerdaftar', ManajemenSekolahCtrl.listStaffSekolahTerdaftar)
router.get('/detailStaffSekolahTerdaftar', ManajemenSekolahCtrl.detailStaffSekolahTerdaftar)
router.get('/topupStaffSekolahTerdaftar', ManajemenSekolahCtrl.topupStaffSekolahTerdaftar)
//siswa
router.get('/listSiswaSekolahTerdaftar', ManajemenSekolahCtrl.listSiswaSekolahTerdaftar)

module.exports = router;
