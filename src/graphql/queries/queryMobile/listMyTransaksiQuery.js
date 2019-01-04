// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
// Graphql Types
const transaksiListType = require('../../types/transaksiListType').transaksiListType
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const listMyTransaksi = {
  type: transaksiListType,
  args: {token: {type: GraphQLString}},
  resolve: function (parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      return kode_pelanggan
    } else {
      throw new Error('Not Authorized')
    }
  }
}

module.exports = {
  listMyTransaksi
};
