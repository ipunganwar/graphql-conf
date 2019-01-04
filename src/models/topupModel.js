var mongoose = require('mongoose')
var Schema = mongoose.Schema

var topupSchema = new Schema({
  kode_pelanggan: {
    type: String,
    required: true,
    ref: 'Pelanggan'
  },
  tanggal_waktu: {
    type: Date,
    required: true,
  },
  bank_asal: {
    type: String,
    required: true,
  },
  bank_tujuan: {
    type: String,
    required: true,
  },
  nama_pengirim: {
    type: String,
    required: true
  },
  saldo_topup: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

var Topup = mongoose.model('Topup', topupSchema)

module.exports = Topup;
