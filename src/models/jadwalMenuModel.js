const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema
// const Outlet = require('./outletModel')
// const Menu = require('./menuModel')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'admin'+'@'+'sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/entertainme_movies?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');

const jadwalMenuSchema = new Schema({
  kode_outlet: {
    type: String,
    required: true,
    maxlength: 16,
    ref: 'Outlet'
  },
  kode_menu: {
    type: String,
    required: true,
    maxlength: 8,
    ref: 'Menu'
  },
  tanggal_penetapan: {
    type: Date,
    required: true
  },
  istirahat1: {
    type: Boolean
  },
  istirahat2: {
    type: Boolean
  },
  istirahat3: {
    type: Boolean
  },
  senin: {
    type: Boolean
  },
  selasa: {
    type: Boolean
  },
  rabu: {
    type: Boolean
  },
  kamis: {
    type: Boolean
  },
  jumat: {
    type: Boolean
  },
  sabtu: {
    type: Boolean
  },
  minggu: {
    type: Boolean
  },
},{
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

jadwalMenuSchema.plugin(idvalidator)

const Model = mongoose.model('JadwalMenu', jadwalMenuSchema)
//
// Model.create({
//   kode_outlet: '00002SE000001002',
//   kode_menu: '00002005',
//   tanggal_penetapan: new Date(2018, 3, 18),
//   istirahat1: false,
//   istirahat2: false,
//   istirahat3: false,
//   senin: false,
//   selasa: false,
//   rabu: false,
//   kamis: false,
//   jumat: false,
//   sabtu: false,
//   minggu: false,
// }).then((da) => {console.log(data)})

module.exports = Model
