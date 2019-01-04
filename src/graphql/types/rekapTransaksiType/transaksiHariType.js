const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt

exports.rekapTransaksiHariType = new GraphQLObjectType({
  name: 'rekapTransaksiHari',
  fields: () => {
    return {
      hari: {
        type: rekapJenisTransaksi,
        description: 'saldo transaksi per hari'
      },
      istirahat1: {
        type: rekapJenisTransaksi,
        description: 'saldo transaksi per istirahat 1'
      },
      istirahat2: {
        type: rekapJenisTransaksi,
        description: 'saldo transaksi per istirahat 2'
      },
      istirahat3: {
        type: rekapJenisTransaksi,
        description: 'saldo transaksi per istirahat 3'
      }
    }
  }
})

let rekapJenisTransaksi = new GraphQLObjectType({
  name: 'rekapJenisTransaksi',
  fields: {
    transaksiAplikasi: {
      type: GraphQLInt,
      description: 'jumlah saldo transaksi aplikasi'
    },
    transaksiKasir: {
      type: GraphQLInt,
      description: 'jumlah saldo transaksi kasir'
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
})
