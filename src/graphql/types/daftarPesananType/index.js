const graphql                = require('graphql')
const GraphQLObjectType      = graphql.GraphQLObjectType
const GraphQLString          = graphql.GraphQLString
const detailRekapPesananType = require('./detailRekapPesananType')

const rekapPesananType = new GraphQLObjectType({
  name: 'rekapPesananTablet',
  fields: () => {
    return {
      tanggalTransaksi: {
        type: GraphQLString,
        description: 'tanggal transaksi dari pesanan'
      },
      istirahat1: {
        type: detailRekapPesananType,
        description: 'detail rekap pesanan istirahat1'
      },
      istirahat2: {
        type: detailRekapPesananType,
        description: 'detail rekap pesanan istirahat2'
      },
      istirahat3: {
        type: detailRekapPesananType,
        description: 'detail rekap pesanan istirahat3'
      }
    }
  }
})

module.exports = rekapPesananType
