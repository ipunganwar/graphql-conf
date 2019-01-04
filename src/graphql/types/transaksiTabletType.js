const graphql             = require('graphql')
const GraphQLObjectType   = graphql.GraphQLObjectType
const GraphQLNonNull      = graphql.GraphQLNonNull
const GraphQLList         = graphql.GraphQLList
const GraphQLID           = graphql.GraphQLID
const GraphQLString       = graphql.GraphQLString
const GraphQLInt          = graphql.GraphQLInt
const transaksiDetailType = require('./transaksiDetailType').transaksiDetailType
const pelangganType       = require('./pelangganType').pelangganType
const outletType          = require('./outletType').outletType
const transaksiIstirahatType = require('./transaksiIstirahatType').transaksiIstirahatType

exports.transaksiType = new GraphQLObjectType({
  name: 'transaksiTablet',
  fields: () => {
    return {
      _id:{
        type: new GraphQLNonNull(GraphQLID),
        description: 'id transaksi'
      },
      kode_pelanggan: {
        type: pelangganType,
        description: 'kode pelanggan pemesan menu'
      },
      kode_outlet: {
        type: outletType,
        description: 'kode outlet tempat memesan'
      },
      tanggal_ambil: {
        type: GraphQLString,
        description: 'tanggal ambil pesanan oleh pemesan'
      },
      jenis_transaksi: {
        type: GraphQLInt,
        description: 'jenis dari transaksi'
      },
      transaksi_detail: {
        type: transaksiIstirahatType,
        description: 'detail dari transaksi yang dipesan'
      },
      created_at: {
        type: GraphQLString,
        description: 'tanggal transaksi dibuat'
      }
    }
  }
})
