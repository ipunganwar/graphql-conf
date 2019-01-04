// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
// Graphql Types
const outletType = require('../../types/outletType').outletType
// Models for database
const Pelanggan = require('../../../models/').Pelanggan
const Outlet = require('../../../models/').Outlet
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const listMyKantin = {
  type: new GraphQLList(outletType),
  args: {token: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      let kode_sekolah = await Pelanggan.findOne({_id: kode_pelanggan})
      kode_sekolah = kode_sekolah.kode_sekolah
      let listOutlet = await Outlet.find({kode_sekolah: kode_sekolah}).populate('kode_kantin kode_sekolah')
      return listOutlet
    } else {
      throw new Error('Not Authorized')
    }
  }
}

module.exports = {
  listMyKantin
};
