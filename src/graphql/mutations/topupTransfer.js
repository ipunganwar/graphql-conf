var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var Topup = require('../../models/').Topup
var Pelanggan = require('../../models/').Pelanggan
var verifyTokenPelanggan = require('../../helpers/verifyTokenPelanggan')
var pushNewNotification = require('../../helpers/pushNewNotifDashboard')
const topupType = require('../types/topupType').topupType

module.exports = {
  type: topupType,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    tanggal_waktu: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bank_asal: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bank_tujuan: {
      type: new GraphQLNonNull(GraphQLString),
    },
    nama_pengirim: {
      type: new GraphQLNonNull(GraphQLString),
    },
    saldo_topup: {
      type: new GraphQLNonNull(GraphQLInt),
    }
  },
  resolve(parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      let obj = args
      delete obj.token
      let topup = Topup.create({
        kode_pelanggan: kode_pelanggan,
        tanggal_waktu: new Date(obj.tanggal_waktu),
        bank_asal: obj.bank_asal,
        bank_tujuan: obj.bank_tujuan,
        nama_pengirim: obj.nama_pengirim,
        saldo_topup: obj.saldo_topup,
        status: 0,
      })
      Pelanggan.findById(kode_pelanggan).then((pelangganData) => {
        pushNewNotification(pelangganData.kode_sekolah, pelangganData.nama_pelanggan, obj.saldo_topup)
      }).catch((err) => {
        console.log('fail to add new notification to dashboard')
      })
      return topup
    } else {
      throw new Error('Not Authorized')
    }
  }
}
