const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema

const menuSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 8
  },
  kode_kantin: {
    type: String,
    required: true,
    ref: 'Kantin'
  },
  nama_menu: {
    type: String,
    required: true,
    maxlength: 50
  },
  jenis_menu: {
    type: Number,
    required: true
  },
  foto_menu: {
    type: String
  },
  deskripsi: {
    type: String,
    required: true
  },
  nama_vendor: {
    type: String
  },
  tingkat_pedas: {
    type: Number,
    required: true
  },
  zat_besi: {
    type: Number
  },
  protein: {
    type: Number
  },
  karbohidrat: {
    type: Number
  },
  kkal: {
    type: Number
  },
  kolesterol: {
    type: Number
  },
  lemak: {
    type: Number
  },
  b1: {
    type: Number
  },
  bahan: [{
    type: String,
    ref: 'Bahan'
  }],
  harga:[{
    tanggal_penetapan: {
      type: Date,
      required: true
    },
    harga: {
      type: Number,
      required: true
    }
  }],
  promo: [{
    tanggal_awal: {
      type: Date,
      required: true
    },
    tanggal_akhir: {
      type: Date,
      required: true
    },
    potongan: {
      type: Number
    },
    jenis_potongan: {
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
  }
})

menuSchema.plugin(idvalidator)

menuSchema.virtual('kode_menu').get(() => {
  return this._id
})

const Model = mongoose.model('Menu', menuSchema)
module.exports = Model
