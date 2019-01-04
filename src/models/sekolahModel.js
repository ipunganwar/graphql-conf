var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Types.ObjectId;
var encrypt = require('../helpers/cryptoHelper')
var Wilayah = require('./wilayahModel')

var sekolahSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 8
  },
  nama_sekolah: {
    type: String,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
  },
  jenjang: {
    type: String,
    required: true,
    maxlength: 20
  },
  no_telp: {
    type: String,
    required: true,
    maxlength: 14
  },
  alamat_sekolah: {
    type: String,
    required: true
  },
  kode_pos: {
    required: true,
    maxlength: 5,
    type: String,
    ref: 'Wilayah',
  },
  koordinator: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String
  },
  jumlah_istirahat: {
    istirahat1: {
      required: true,
      type: Boolean
    },
    istirahat1_start: {
      type: String
    },
    istirahat1_end: {
      type: String
    },
    istirahat2: {
      required: true,
      type: Boolean
    },
    istirahat2_start: {
      type: String
    },
    istirahat2_end: {
      type: String
    },
    istirahat3: {
      required: true,
      type: Boolean
    },
    istirahat3_start: {
      type: String
    },
    istirahat3_end: {
      type: String
    }
  },
  potongan: [{
    tanggal_penetapan: {
      type: Date
    },
    potongan: {
      type: Number,
    },
    jenis_potongan: {
      type: Number
    },
    potongan_untuk: []
  }],
  waktu_transfer: {
    type: String
  },
  rekening: [{
    nama_bank: {
      type: String,
      required: true,
      maxlength: 50
    },
    no_rekening: {
      type: String,
      required: true,
      maxlength: 20
    },
    atas_nama: {
      type: String,
      required: true,
      maxlength: 50
    },
    tanggal_simpan: {
      type: Date
    }
  }],
  fee: [{
    tanggal_penetapan: {
      type: Date
    },
    fee_sekolah: {
      type: Number
    },
    jenis_fee_sekolah: {
      type: Number
    },
    fee_sap: {
      type: Number
    },
    jenis_fee_sap: {
      type: Number
    },
    fee_ski: {
      type: Number
    },
    jenis_fee_ski: {
      type: Number
    }
  }]
}, {
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

sekolahSchema.virtual('kode_sekolah').get(function() {
    return this._id;
});

var Sekolah = mongoose.model('Sekolah',sekolahSchema)

// Sekolah.findOneAndUpdate({_id: 'SE000001'}, {
//   fee: [{
//     tanggal_penetapan: new Date('2018-04-12'),
//     fee_sap: 125,
//     jenis_fee_sap: 1,
//     fee_ski: 175,
//     jenis_fee_ski: 1,
//     fee_sekolah: 50,
//     jenis_fee_sekolah: 1,
//   }]
// }).then((data) => {
//   console.log(data);
// })

module.exports = Sekolah;

// class Model {
//   static model() {
//     return Sekolah
//   }
//   static read() {
//     return new Promise((resolve, reject) => {
//       Sekolah.find({}).populate('kode_pos').then((data) => {
//         if (data.length)
//           resolve({
//             message: 'Data Found',
//             data
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
//   static readOne(id) {
//     return new Promise((resolve, reject) => {
//       Sekolah.findOne({
//         "_id": id
//       }).populate('kode_pos').then((data) => {
//         if (data)
//           resolve({
//             message: 'Data Found',
//             data
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
//       Sekolah.create({
//         _id: insert.kode_sekolah,
//         nama_sekolah: insert.nama_sekolah,
//         password: insert.password,
//         jenjang: insert.jenjang,
//         alamat_sekolah: insert.alamat_sekolah,
//         kode_pos: insert.kode_pos,
//         no_telp: insert.no_telp,
//         potongan: insert.potongan,
//         fee: insert.fee
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
//   static update(update) {
//     return new Promise((resolve, reject) => {
//       if (update.password) {
//         update.password = encrypt(update.password)
//       }
//       Sekolah.findOneAndUpdate({
//         "_id": update._id
//       }, update, {
//         new: true
//       }).then((data) => {
//         resolve({
//           message: 'Update Success',
//           data
//         })
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   }
//   static delete(id) {
//     return new Promise((resolve, reject) => {
//       Sekolah.findOneAndRemove({
//         "_id": id
//       }).then((data) => {
//         resolve({
//           message: 'Delete Success',
//           data
//         })
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   }
// }
//
// module.exports = Model;
