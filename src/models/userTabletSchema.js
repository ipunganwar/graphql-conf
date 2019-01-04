const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const userTabletSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  kode_referensi: {
    type: String,
    required: true
  },
  tipe_user: {
    type: Number,
    required: true
  }
})

const Model = mongoose.model('userTablet', userTabletSchema)
module.exports = Model
