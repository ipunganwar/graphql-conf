const graphql               = require('graphql')
const GraphQLObjectType     = graphql.GraphQLObjectType
const subRekapPembelianType = require('./subRekapPembelianType')

const rekapPembelianType = new GraphQLObjectType({
  name: 'rekapPembelian',
  fields: () => {
    return {
      semua: {
        type: subRekapPembelianType,
        description: 'rekap transaksi pembelian per hari'
      },
      istirahat1: {
        type: subRekapPembelianType,
        description: 'rekap transaksi pembelian per istirahat 1'
      },
      istirahat2: {
        type: subRekapPembelianType,
        description: 'rekap transaksi pembelian per istirahat 2'
      },
      istirahat3: {
        type: subRekapPembelianType,
        description: 'rekap transaksi pembelian per istirahat 3'
      }
    }
  }
})

module.exports = rekapPembelianType
