const mongoose    = require('mongoose')
const idvalidator = require('mongoose-id-validator')
const Schema      = mongoose.Schema

const bahanSchema = new Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 5
  },
  nama_bahan: {
    type: String,
    required: true,
    maxlength: 20
  },
  icon_bahan: {
    type: String
  }
}, {
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

bahanSchema.plugin(idvalidator)
bahanSchema.virtual('kode_bahan').get(() => {
  return this._id
})

const Model = mongoose.model('Bahan', bahanSchema)
module.exports = Model
