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
    email: {
      type: GraphQLString,
    },
    alamat: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    }
  },
  resolve(parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      let obj = args
      if (args.password) {
        obj.password = encrypt(args.password)
      }
      delete obj.token
      let pengguna = Pelanggan.findOneAndUpdate({
        _id: kode_pelanggan,
      }, obj)
      return pengguna
    } else {
      throw new Error('Not Authorized')
    }
  }
}
