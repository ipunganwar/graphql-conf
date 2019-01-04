const mongoose = require('mongoose')
const Schema   = mongoose.Schema;
var idvalidator = require('mongoose-id-validator')
var Sekolah = require('./sekolahModel')

const userDashboardSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  level_user: {
    type: Number,
    required: true
  },
  foto: {
    type: String
  },
  telepon: {
    type: String
  },
  alamat: {
    type: String
  },
  kode_sekolah: [{
    type: String,
    ref: 'Sekolah'
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
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

userDashboardSchema.plugin(idvalidator)

const Model = mongoose.model('userDashboard', userDashboardSchema)
module.exports = Model
