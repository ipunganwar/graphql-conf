// Graphql Data type
const GraphQLObjectType = require('graphql').GraphQLObjectType;
// Mobile
const pelangganProfile = require('./pelangganProfileQuery').pelangganProfile
const listMyTransaksi = require('./listMyTransaksiQuery').listMyTransaksi
const jadwal = require('./jadwalQuery').jadwal
const listMyKantin = require('./listMyKantinQuery').listMyKantin
const listMyOrders = require('./listMyOrderQuery').listMyOrders
const listMenuByKantin = require('./listMenuByKantinQuery').listMenuByKantin
const listMenuBySekolah = require('./listMenuBySekolahQuery').listMenuBySekolah
const detailMenu = require('./detailMenuQuery').detailMenu

module.exports = {
  pelangganProfile,
  listMyTransaksi,
  jadwal,
  listMyKantin,
  listMyOrders,
  listMenuByKantin,
  listMenuBySekolah,
  detailMenu
}
