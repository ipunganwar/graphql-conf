const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema

const kantinSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 5
  },
  tanggal_register: {
    type: Date,
    required: true
  },
  nama_kantin: {
    type: String,
    required: true,
    maxlength: 50
  },
  no_telepon: {
    type: String,
    required: true,
    maxlength: 14
  },
  foto_kantin: {
    type: String,
    required: true
  }
},{
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

kantinSchema.plugin(idvalidator)

kantinSchema.virtual('kode_kantin').get(() => {
  return this._id
})

const Model = mongoose.model('Kantin', kantinSchema)
module.exports = Model
