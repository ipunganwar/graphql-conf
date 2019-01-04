const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt

const subRekapTransaksiType = new GraphQLObjectType({
  name: 'subRekapTransaksi',
  fields: () => {
    return {
      transaksiAplikasi: {
        type: GraphQLInt,
        description: 'rekap jumlah saldo transaksi aplikasi'
      },
      transaksiKasir: {
        type: GraphQLInt,
        description: 'rekap jumlah saldo transaksi kasir'
      }
    }
  }
})

module.exports = subRekapTransaksiType
