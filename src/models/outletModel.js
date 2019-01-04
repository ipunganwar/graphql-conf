const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema

const outletSchema = new Schema({
  _id: {
    type: String,
    maxlength: 16,
    required: true
  },
  kode_kantin: {
    type: String,
    ref: 'Kantin',
    required: true
  },
  kode_sekolah: {
    type: String,
    ref: 'Sekolah',
    required: true
  },
  nama_outlet: {
    type: String,
    required: true,
    maxlength: 50
  },
  no_telepon: {
    type: String,
    required: true,
    maxlength: 14
  },
  foto_pemilik: {
    type: String,
    required: true
  },
  nama_pemilik: {
    type: String,
    required: true,
    maxlength: 50
  },
  alamat_pemilik: {
    type: String,
    required: true
  },
  email_pemilik: {
    type: String,
    required: true
  },
  saldo: {
    type: Number
  },
  status: {
    type: Number
  },
  kode_perangkat: {
    type: String
  },
  rekening: {
    nama_bank: {
      type: String,
      maxlength: 50
    },
    no_rekening: {
      type: String,
      maxlength: 20
    },
    atas_nama: {
      type: String,
      maxlength: 50
    },
    tanggal_simpan: {
      type: Date
    }
  },
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
  }],
  notifikasi: [{
    tanggal_waktu: {
      type: Date
    },
    notifikasi: {
      type: String
    },
    baca: {
      type: Boolean
    }
  }]
},{
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

outletSchema.plugin(idvalidator)

outletSchema.virtual('kode_outlet').get(function() {
  return this._id
})

const Model = mongoose.model('Outlet', outletSchema)
module.exports = Model
