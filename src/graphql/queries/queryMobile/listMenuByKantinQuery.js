// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
// Graphql Types
const jadwalMenuType = require('../../types/jadwalMenuType').jadwalMenuType
// Models for database
const JadwalMenu = require('../../../models/').JadwalMenu
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const listMenuByKantin = {
  type: new GraphQLList(jadwalMenuType),
  args: {token: {type: GraphQLString}, kode_outlet: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    if (args.token) {
      let jadwalMenu = JadwalMenu.find({kode_outlet: args.kode_outlet, tanggal_penetapan: {$lte: new Date()}}).populate('kode_menu kode_outlet')
      return jadwalMenu
    } else {
      throw new Error('Not Authorized')
    }
  }
}

module.exports = {
  listMenuByKantin
};
