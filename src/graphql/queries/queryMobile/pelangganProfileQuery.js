// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
// Graphql Types
const pelangganType = require('../../types/pelangganType').pelangganType
// Models for database
const Pelanggan = require('../../../models/').Pelanggan
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const pelangganProfile = {
  type: pelangganType,
  // ini pake token
  args: {token: {type: GraphQLString}},
  resolve: async (parentValue, args) => {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      const pelanggan = await Pelanggan.findOne({
        "_id": kode_pelanggan
      }).populate("kode_sekolah")
      pelanggan.notifikasi = pelanggan.notifikasi
        .sort(function (a, b) {
            return a.tanggal_waktu < b.tanggal_waktu ? 1 : -1;
          });
      return pelanggan
    } else {
      throw new Error('Not Authorized')
    }
  },
}

module.exports = {
  pelangganProfile
};
