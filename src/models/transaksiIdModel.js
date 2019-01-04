var mongoose = require('mongoose')
var Schema = mongoose.Schema

var transaksiIdSchema = new Schema({
  kode_transaksi: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    default: 2
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

var TransaksiId = mongoose.model('TransaksiId', transaksiIdSchema)

module.exports = TransaksiId;
