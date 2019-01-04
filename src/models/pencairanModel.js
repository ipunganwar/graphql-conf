var mongoose = require('mongoose')
var Schema = mongoose.Schema

var pencairanSchema = new Schema({
  kode_outlet: {
    type: String,
    required: true,
    ref: 'Outlet'
  },
  tanggal_pencairan: {
    type: Date,
    required: true,
  },
  saldo_kredit: {
    type: Number,
    required: true,
  },
  fee_sekolah: {
    type: Number,
    required: true,
  },
  fee_sap: {
    type: Number,
    required: true
  },
  fee_ski: {
    type: Number,
    required: true
  },
  saldo_tunai: {
    type: Number,
    required: true
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

var Pencairan = mongoose.model('Pencairan', pencairanSchema)

module.exports = Pencairan;
