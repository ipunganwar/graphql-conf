const graphql               = require('graphql')
const GraphQLObjectType     = graphql.GraphQLObjectType
const subRekapTransaksiType = require('./subRekapTransaksiType')

const rekapTransaksiType = new GraphQLObjectType({
  name: 'rekapTransaksi',
  fields: () => {
    return {
      semua: {
        type: subRekapTransaksiType,
        description: 'rekap saldo transaksi per hari'
      },
      istirahat1: {
        type: subRekapTransaksiType,
        description: 'rekap saldo transaksi per istirahat 1'
      },
      istirahat2: {
        type: subRekapTransaksiType,
        description: 'rekap saldo transaksi per istirahat 2'
      },
      istirahat3: {
        type: subRekapTransaksiType,
        description: 'rekap saldo transaksi per istirahat 3'
      }
    }
  }
})

module.exports = rekapTransaksiType
