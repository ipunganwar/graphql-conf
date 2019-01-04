const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt

exports.rekapTransaksiPerPeriodType = new GraphQLObjectType({
  name: 'rekapTransaksiPerPeriod',
  fields: () => {
    return {
      transaksiAplikasi: {
        type: GraphQLInt,
        description: 'saldo transaksi aplikasi per period'
      },
      transaksiKasir: {
        type: GraphQLInt,
        description: 'saldo transaksi kasir per period'
      },
      makanan: {
        type: GraphQLInt,
        description: 'jumlah makanan terjual'
      },
      minuman: {
        type: GraphQLInt,
        description: 'jumlah minuman terjual'
      },
      snack: {
        type: GraphQLInt,
        description: 'jumlah snack terjual'
      },
      kasir: {
        type: GraphQLInt,
        description: 'jumlah menu kasir terjual'
      }
    }
  }
})
