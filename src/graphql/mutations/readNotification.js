var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var Pelanggan = require('../../models/').Pelanggan
var encrypt = require('../../helpers/cryptoHelper')
var verifyTokenPelanggan = require('../../helpers/verifyTokenPelanggan')
var pelangganType = require('../types/pelangganType').pelangganType

module.exports = {
  type: pelangganType,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastNotification: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  async resolve (parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      args.lastNotification = args.lastNotification.replace(/###/g, '"')
      args.lastNotification = JSON.parse(args.lastNotification)
      let pelanggan = await Pelanggan.findOne({
        _id: kode_pelanggan,
      })
      let indexNotif = null
      for (var i = pelanggan.notifikasi.length - 1; i > 0; i--) {
        if (pelanggan.notifikasi[i]._id == args.lastNotification._id) {
          indexNotif = i
          break;
        }
      }
      let copyOfPelanggan = JSON.parse(JSON.stringify(pelanggan))
      if (indexNotif != null) {
        for (var i = 0; i <= indexNotif; i++) {
          copyOfPelanggan.notifikasi[i].baca = true
        }
      }
      let newPelanggan = await Pelanggan.findByIdAndUpdate(kode_pelanggan, {
        notifikasi: copyOfPelanggan.notifikasi
      }, {new: true})
      return newPelanggan
    } else {
      throw new Error('Not Authorized')
    }
  }
}
