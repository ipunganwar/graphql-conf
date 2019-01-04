const graphql                = require('graphql')
const GraphQLObjectType      = graphql.GraphQLObjectType
const subTransaksiKreditType = require('./subTransaksiKreditType')

const subSaldoKreditType = new GraphQLObjectType({
  name: 'subSaldoKredit',
  fields: () => {
    return {
      istirahat1: {
        type: subTransaksiKreditType,
        description: 'rekap transaksi tablet per istirahat 1'
      },
      istirahat2: {
        type: subTransaksiKreditType,
        description: 'rekap transaksi tablet per istirahat 2'      
      },
      istirahat3: {
        type: subTransaksiKreditType,
        description: 'rekap transaksi tablet per istirahat 3'      
      }
    }
  }
})

module.exports = subSaldoKreditType
