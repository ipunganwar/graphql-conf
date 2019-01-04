let Outlet = require('../models/').Outlet
let Kantin = require('../models/').Kantin
let Sekolah = require('../models/').Sekolah

// let mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');

async function autoGenerateIdOutlet (kode_kantin, kode_sekolah) {
  try {
    let data = await Outlet.find({'_id': new RegExp(kode_kantin+kode_sekolah, 'i')}).sort([['_id', 'descending']])
    if (data.length < 1){
      return kode_kantin+kode_sekolah+'001'
    } else {
      let lastId = data[0]["_id"]
      lastId = lastId.split(kode_kantin+kode_sekolah).join('')
      let newId = parseInt(lastId) + 1
      if (newId < 10) {
        newId = '00' + newId.toString()
      }
      else if (newId < 100) {
        newId = '0' + newId.toString()
      }
      else if (newId < 1000) {
        newId = '' + newId.toString()
      }
      return kode_kantin+kode_sekolah+newId
    }
  }
  catch(err) {
    console.log(err)
    return err
  }
}

// Outlet.findOneAndUpdate({
//   _id: '00002SE000001001'
// }, {email_pemilik: 'ahmadnizar@ekantin.id'}).then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.err(err)
// })

// autoGenerateIdOutlet('00002','SE000001')

// how to use
// async function create_user(kode_kantin, kode_sekolah) {
//   Outlet.create({
//     _id: await autoGenerateIdOutlet(kode_kantin, kode_sekolah),
//     kode_kantin: kode_kantin,
//     kode_sekolah: kode_sekolah,
//     nama_outlet: 'Kantin Ibu Ungu Second Gen',
//     no_telepon: '021831832',
//     foto_pemilik: 'https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg',
//     nama_pemilik: 'Ibu Ungu 2',
//     alamat_pemilik: 'Jl. Ini jalan apa ya namanya',
//     email_pemilik: 'ibuungu2@gmail.com',
//     saldo: 0,
//     status: 0,
//     kode_perangkat: 'BKMCDKFC',
//     rekening: {
//       nama_bank: 'BNI',
//       no_rekening: '000333123',
//       atas_nama: 'Ibu Ungu 2',
//       tanggal_simpan: Date.now()
//     },
//     riwayat_user: [],
//     notifikasi: [{
//       tanggal_waktu: new Date(2018, 0, 20),
//       notifikasi: 'Hi Ibu Ungu 2! Tadi mau notif apa ya',
//       baca: true
//     }, {
//       tanggal_waktu: new Date(2018, 2, 21),
//       notifikasi: 'Hi Ibu Ungu 2! Kentut telah disetujui oleh admin',
//       baca: true
//     }]
//   })
// }
// create_user('00002', 'SE000001')

module.exports = autoGenerateIdOutlet;
