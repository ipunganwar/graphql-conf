// Graphql Data type
const GraphQLObjectType = require('graphql').GraphQLObjectType;

// Mobile Query List
const query_mobile = require('./queryMobile')

//Tablet Query List
const query_tablet = require('./queryTablet')

// Tablet
const findAllOutlet = require('./outletQuery').findAllOUtlet
const findOutletById = require('./outletQuery').findOutletById
const findAllMenu = require('./menuQuery').findAllMenu
const findMenuByIdOutlet = require('./menuQuery').findMenuByIdOutlet
const findAllTransaksi = require('./transaksiQuery').findAllTransaksi
const findPesananByOutlet = require('./transaksiQuery').findPesananByOutlet
const findPesananByOutletAndUser = require('./transaksiQuery').findPesananByOutletAndUser
const findNotifikasiByOutletId = require('./notifikasiQuery').findNotifikasiByOutletId

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      ...query_mobile,
      ...query_tablet,
      outlets: findAllOutlet,
      outletById: findOutletById,
      menus: findAllMenu,
      menusByIdOutlet: findMenuByIdOutlet,
      transaksis: findAllTransaksi,
      transaksisByIdOutlet: findPesananByOutlet,
      transaksisByIdOutletAndIdPemesan: findPesananByOutletAndUser,
      notifikasisByOutletId: findNotifikasiByOutletId
    }
  },
  description: 'List of Available Query'
});
