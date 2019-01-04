let Kantin = require('../models/').Kantin
let Menu = require('../models/').Menu
let Bahan = require('../models/').Bahan

// let mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');

async function autoGenerateIdMenu (kode_kantin) {
  try {
    let data = await Menu.find({'_id': new RegExp(kode_kantin, 'i')}).sort([['_id', 'descending']])
    if (data.length < 1){
      return kode_kantin+'001'
    } else {
      let lastId = data[0]["_id"]
      lastId = lastId.split(kode_kantin).join('')
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
      return kode_kantin+newId
    }
  }
  catch(err) {
    console.log(err)
    return err
  }
}

// Menu.findOneAndUpdate({
//   _id: '00002003'
// }, {
//   harga: [{
//         tanggal_penetapan: new Date(),
//         harga: 7500
//       }, {
//         tanggal_penetapan: new Date('2018-04-12'),
//         harga: 10000
//       }]
// }).then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.err(err)
// })

// // how to use
// async function create_user(kode_kantin) {
//   var today = new Date();
//   var h6Tomorrow = new Date();
//   h6Tomorrow.setDate(today.getDate()+6);
//   Menu.create({
//     _id: await autoGenerateIdMenu(kode_kantin),
//     kode_kantin: kode_kantin,
//     nama_menu: 'Kue Tete',
//     jenis_menu: 3,
//     foto_menu: 'https://www.hipwee.com/wp-content/uploads/2018/04/hipwee-185873-nama-makanan-1-640x600.jpg',
//     deskripsi: 'Kue aja udah lah',
//     tingkat_pedas: 0,
//     zat_besi: 11,
//     protein: 4,
//     karbohidrat: 2,
//     kkal: 3,
//     kolesterol: 15,
//     lemak: 11,
//     b1: 1,
//     bahan: [],
//     promo: [],
//     harga: [{
//       tanggal_penetapan: today,
//       harga: 500
//     }, {
//       tanggal_penetapan: h6Tomorrow,
//       harga: 1000
//     }]
//   })
// }
//
// create_user('00002')


module.exports = autoGenerateIdMenu;
