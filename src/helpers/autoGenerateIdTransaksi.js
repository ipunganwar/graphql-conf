let Outlet = require('../mongoModels/').Outlet
let Kantin = require('../mongoModels/').Kantin
let TransaksiId = require('../mongoModels/').TransaksiId
let Sekolah = require('../mongoModels/').Sekolah
let Menu = require('../mongoModels/').Menu
let Pelanggan = require('../mongoModels/').Pelanggan

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');

async function autoGenerateIdTransaksi (kode_kantin) {
  try {
    let tanggal_sekarang = new Date()
    let bulanSekarang = tanggal_sekarang.getMonth() + 1
    if (bulanSekarang < 10) {
      bulanSekarang = '0' + bulanSekarang.toString()
    }
    let tahunSekarang = tanggal_sekarang.getFullYear().toString()
    tahunSekarang = tahunSekarang[2] + tahunSekarang[3]
    let data = await TransaksiId.findOneAndUpdate({'kode_transaksi': new RegExp(tahunSekarang+bulanSekarang+kode_kantin, 'i')}, {$set: {kode_transaksi: tahunSekarang+bulanSekarang+kode_kantin}, $inc: {index: 1}}, {upsert: true}).sort([['_id', 'descending']])
    if (data == null){
      return tahunSekarang+bulanSekarang+kode_kantin+'0000000'
    } else {
      let lastId = data["index"]
      let newId = parseInt(lastId)
      if (newId < 10) {
        newId = '000000' + newId.toString()
      }
      else if (newId < 100) {
        newId = '00000' + newId.toString()
      }
      else if (newId < 1000) {
        newId = '0000' + newId.toString()
      }
      else if (newId < 10000) {
        newId = '000' + newId.toString()
      }
      else if (newId < 100000) {
        newId = '00' + newId.toString()
      }
      else if (newId < 1000000) {
        newId = '0' + newId.toString()
      }
      else if (newId < 10000000) {
        newId = '' + newId.toString()
      }
      return tahunSekarang+bulanSekarang+kode_kantin+newId
    }
  }
  catch(err) {
    console.log(err)
    return err
  }
}
// // how to use
// async function create_user(kode_kantin, kode_pelanggan) {
//   Transaksi.create({
//     _id: await autoGenerateIdTransaksi(kode_kantin),
//     kode_pelanggan: 'P00000000001',
//     kode_outlet: '00002SE000001001',
//     tanggal_ambil: new Date(2018, 2, 29),
//     transaksi_detail: [{
//       kode_menu: '00002001',
//       nama_menu: 'Nasi Edon',
//       jam_istirahat: 1,
//       jam_ambil: null,
//       jumlah_pesan: 1,
//       jumlah_ambil: 0,
//       jumlah_kembali: 0,
//       harga_beli: 15750
//     }],
//     jenis_transaksi: 0
//   })
// }
//
// create_user('00002')

module.exports = autoGenerateIdTransaksi;
