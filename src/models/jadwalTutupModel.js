const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema
// const Sekolah      = require('./sekolahModel')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'GMtwKK4W9Yc9r7OO'+'@'+'staging-shard-00-00-ohijf.mongodb.net:27017,staging-shard-00-01-ohijf.mongodb.net:27017,staging-shard-00-02-ohijf.mongodb.net:27017/ekantindb?ssl=true&replicaSet=staging-shard-0&authSource=admin&retryWrites=true');
// var moment = require('moment-timezone');
// moment.locale('id')

const jadwalTutupSchema = new Schema({
  kode_sekolah: {
    type: String,
    required: true,
    maxlength: 8,
    ref: 'Sekolah'
  } ,
  tanggal_tutup: {
    type: Date
  },
  keterangan: {
    type: String
  },
  label: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

jadwalTutupSchema.plugin(idvalidator)

const Model = mongoose.model('JadwalTutup', jadwalTutupSchema)

// let startOfYear = moment.utc().tz('Asia/Jakarta').startOf('year')
// let endOfYear = moment.utc().tz('Asia/Jakarta').endOf('year')
// var daysOfYear = [];
// for (var d = startOfYear; d <= endOfYear; d.add(1,'days')) {
//     // daysOfYear.push(new Date(d));
//     if (d.day() == 0 || d.day() == 6) {
//       Model.create({
//         kode_sekolah: 'SE000001',
//         tanggal_tutup: d
//       }).then((dd) => {
//         console.log(dd);
//       })
//     }
// }

module.exports = Model
