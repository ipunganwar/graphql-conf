// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
// Graphql Types
const jadwalMenuType = require('../../types/jadwalMenuType').jadwalMenuType
// Models for database
const JadwalMenu = require('../../../models').JadwalMenu
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const detailMenu = {
  type: jadwalMenuType,
  args: {token: {type: GraphQLString}, kode_menu: {type: GraphQLString}, kode_outlet: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    if (args.token) {
      let jadwalMenu = JadwalMenu.findOne({kode_menu: args.kode_menu, kode_outlet: args.kode_outlet, tanggal_penetapan: {$lte: new Date()}}).populate('kode_menu kode_outlet')
      return jadwalMenu
    } else {
      throw new Error('Not Authorized')
    }
  }
}

module.exports = {
  detailMenu
};
