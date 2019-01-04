const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema

const transaksiSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 17
  },
  kode_pelanggan: {
    type: String,
    required: true,
    maxlength: 12,
    ref: 'Pelanggan'
  },
  kode_outlet: {
    type: String,
    required: true,
    maxlength: 16,
    ref: 'Outlet'
  },
  tanggal_ambil: {
    type: Date,
    required: true
  },
  jenis_transaksi: {
    type: Number,
    required: true
  },
  transaksi_detail: [{
    kode_menu: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Menu'
    },
    nama_menu: {
      type: String,
      required: true,
      maxlength: 50
    },
    jam_istirahat: {
      type: Number,
      required: true
    },
    jam_ambil: {
      type: Date,
    },
    jumlah_pesan: {
      type: Number,
      required: true
    },
    jumlah_ambil: {
      type: Number,
      required: true
    },
    jumlah_kembali: {
      type: Number,
      required: true
    },
    harga_beli: {
      type: Number,
      required: true
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

transaksiSchema.plugin(idvalidator)
transaksiSchema.virtual('kode_transaksi').get(() => {
  return this._id
})

const Model = mongoose.model('Transaksi', transaksiSchema)
module.exports = Model
