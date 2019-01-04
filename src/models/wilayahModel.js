var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Types.ObjectId;
var wilayahSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 5
  },
  provinsi: {
    type: String,
    required: true,
    maxlength: 50
  },
  kota: {
    type: String,
    required: true,
    maxlength: 50
  },
  kecamatan: {
    type: String,
    required: true,
    maxlength: 50
  },
}, {
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

wilayahSchema.virtual('kode_pos').get(function() {
    return this._id;
});

var Wilayah = mongoose.model('Wilayah', wilayahSchema)
module.exports = Wilayah;
//
// class Model {
//   static model() {
//     return Wilayah
//   }
//   static read() {
//     return new Promise((resolve, reject) => {
//       Wilayah.find({}).then((data) => {
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
//       Wilayah.findOne({
//         "_id": id
//       }).then((data) => {
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
//       Wilayah.create({
//         _id: insert.kode_pos,
//         kode_pos: insert.kode_pos,
//         provinsi: insert.provinsi,
//         kota: insert.kota,
//         kecamatan: insert.kecamatan
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
//       Wilayah.findOneAndUpdate({
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
//       Wilayah.findOneAndRemove({
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
// // module.exports = Model;
