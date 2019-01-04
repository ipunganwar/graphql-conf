let Kantin = require('../models/').Kantin
let mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');

async function autoGenerateIdKantin () {
  try {
    let data = await Kantin.find({}).sort([['_id', 'descending']])
    if (data.length < 1){
      return '00001'
    } else {
      let lastId = data[0]["_id"]
      let newId = parseInt(lastId) + 1
      if (newId < 10) {
        newId = '0000' + newId.toString()
      }
      else if (newId < 100) {
        newId = '000' + newId.toString()
      }
      else if (newId < 1000) {
        newId = '00' + newId.toString()
      }
      else if (newId < 10000) {
        newId = '0' + newId.toString()
      }
      else if (newId < 100000) {
        newId = '' + newId.toString()
      }
      return newId
    }
  }
  catch(err) {
    console.log(err)
    return err
  }
}

// Kantin.findOneAndUpdate({
//   _id: '00003'
// }, {
//   foto_kantin: 'https://pre00.deviantart.net/a6d7/th/pre/f/2013/116/2/6/gado_gado_muqiitul_anam_by_zackzephyr-d633cgg.jpg'
// }).then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.err(err)
// })

// how to use
// async function create_user() {
//   Kantin.create({
//     _id: await autoGenerateIdKantin(),
//     tanggal_register: Date.now(),
//     nama_kantin: 'Jejepangan Corp',
//     no_telepon: '021831831'
//   })
// }

module.exports = autoGenerateIdKantin;
