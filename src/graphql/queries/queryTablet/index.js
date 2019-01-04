const berandaData       = require('./berandaDataQuery')
const daftarPesananData = require('./daftarPesananQuery')
const transaksiData     = require('./transaksiDataQuery')
const getUserTabletData = require('./userTabletQuery')
const kasirTabletQuery  = require('./kasirTabletQuery')
const menuDataQuery     = require('./menuDataQuery')
const ringkasanQuery    = require('./ringkasanQuery')

module.exports = {
  berandaData,
  daftarPesananData,
  transaksiData,
  getUserTabletData,
  getTransaksiDataByUserIdandTanggalAmbil: kasirTabletQuery.getDataTransaksiByIdPelangganandTanggalAmbil,
  getMenusByIdOutlet: menuDataQuery.getMenuDataByIdOutlet,
  rekapTransaksiHari: ringkasanQuery.findRekapTransaksiByOutlet,
  rekapTransaksiPerPeriod: ringkasanQuery.findRekapTransaksiOutletPerPeriod
}
