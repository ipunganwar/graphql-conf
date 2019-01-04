var encrypt = require('../helpers/cryptoHelper')
var idvalidator = require('mongoose-id-validator')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var Schema = mongoose.Schema
var encrypt = require('../helpers/cryptoHelper')
var Wilayah = require('./wilayahModel')
// let mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');


var pelangganSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  kode_sekolah: {
    type: String,
    ref: 'Sekolah',
    required: true,
    maxlength: 8
  },
  email: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  kelas: {
    type: String,
    maxlength: 20
  },
  username: {
    type: String,
    required: true,
    maxlength: 18,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  foto_pelanggan: {
    type: String,
    required: true
  },
  nama_pelanggan: {
    type: String,
    required: true,
    maxlength: 50
  },
  peran: {
    type: Number,
    required: true,
  },
  saldo: {
    type: Number,
    required: true
  },
  telepon: {
    type: String,
    required: true
  },
  notifikasi: [{
    tanggal_waktu: {
      type: Date
    },
    notifikasi: {
      type: String
    },
    baca: {
      type: Boolean
    }
  }],
  riwayat_user: [{
    tanggal_waktu: {
      type: Date,
      required: true
    },
    alamat_ip: {
      type: String,
    },
    kegiatan: {
      type: String,
      required: true
    },
  }],
  device_token: {
    type: String,
  }
}, {
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

pelangganSchema.plugin(idvalidator)

pelangganSchema.virtual('kode_pelanggan').get(function() {
    return this._id;
});

var Pelanggan = mongoose.model('Pelanggan', pelangganSchema)
//
// Pelanggan.findOneAndUpdate({_id: 'P00000000001'}, {saldo: 1000000}).then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err)
// })

module.exports = Pelanggan;

// class Model {
//   static model() {
//     return Pelanggan
//   }
//   static read() {
//     return new Promise((resolve, reject) => {
//       Pelanggan.find({}).populate('kode_sekolah').then((data) => {
//         if (data.length)
//           Wilayah.populate(data, {
//             path: 'kode_sekolah.kode_pos'
//           }, function (err, populated){
//             resolve({
//               message: 'Data Found',
//               populated
//             })
//           })
//         else
//           reject({
//             message: 'Data Not Found'
//           })
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   }
//   static create(insert) {
//     return new Promise((resolve, reject) => {
//       insert.password = encrypt(insert.password)
//       Pelanggan.create({
//         _id: insert.kode_pelanggan,
//         kode_sekolah: insert.kode_sekolah,
//         kelas: insert.kelas,
//         username: insert.username,
//         password: insert.password,
//         foto_pelanggan: insert.foto_pelanggan,
//         nama_pelanggan: insert.nama_pelanggan,
//         peran: insert.peran,
//         notifikasi: insert.notifikasi
//       }).then((data) => {
//         resolve({
//           message: 'Create Success',
//           data
//         })
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   }
//   static login(username, password) {
//     return new Promise((resolve, reject) => {
//       Pelanggan.findOne({
//         username: username
//       }).then((data) => {
//         password = encrypt(password)
//         if (data.password === password) {
//           var token = jwt.sign({
//             username: data.username,
//             peran: data.peran,
//             kode_pelanggan: data.kode_pelanggan
//           }, process.env.JWT_SALT);
//           resolve({
//             message: 'Login Success',
//             token
//           })
//         } else {
//           reject({
//             message: 'Login Gagal'
//           })
//         }
//       }).catch((err) => {
//         reject({
//           message: 'Login Gagal',
//           err
//         })
//       })
//     })
//   }
// }
// // module.exports = Model;
