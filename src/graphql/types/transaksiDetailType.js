const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt
const menuType          = require('./menuType').menuType

exports.transaksiDetailType = new GraphQLObjectType({
  name: 'transaksiDetail',
  fields: () => {
    return {
      _id: {
        type: GraphQLString,
        description: '_id dari transaksi_detail'
      },
      kode_transaksi: {
        type: GraphQLString,
        description: 'kode_transaksi dari menu yg dipesan'
      },
      kode_outlet: {
        type: GraphQLString,
        description: 'kode_outlet dari menu yg dipesan'
      },
      kode_menu: {
        type: menuType,
        description: 'kode menu pesanan'
      },
      nama_menu: {
        type: GraphQLString,
        description: 'name menu yang dipesan'
      },
      jam_istirahat: {
        type: GraphQLInt,
        description: 'jam istirahat menu dipesan'
      },
      jam_ambil: {
        type: GraphQLString,
        description: 'jam ambil menu oleh user'
      },
      jumlah_pesan: {
        type: GraphQLInt,
        description: 'jumlah menu yang dipesan'
      },
      jumlah_ambil: {
        type: GraphQLInt,
        description: 'jumlah menu yang telah diambil'
      },
      jumlah_kembali: {
        type: GraphQLInt,
        description: 'jumlah menu yang dikembalikan'
      },
      harga_beli: {
        type: GraphQLInt,
        description: 'harga menu yang dipesan'
      }
    }
  }
})
