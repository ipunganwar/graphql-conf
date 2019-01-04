const graphql              = require('graphql')
const GraphQLObjectType    = graphql.GraphQLObjectType
const GraphQLString        = graphql.GraphQLString
const GraphQLList          = graphql.GraphQLList
const laporanTransaksiType = require('./laporanTransaksiType')
const mutasiTransaksiType  = require('./mutasiTransaksiType')

const rekapTransaksiTabletType = new GraphQLObjectType({
  name: 'rekapTransaksiTablet',
  fields: () => {
    return {
      tanggalTransaksi: {
        type: GraphQLString,
        description: 'tanggal rekap transaksi tablet'
      },
      laporanTransaksi: {
        type: laporanTransaksiType,
        description: 'detail laporan transaksi harian tablet'
      },
      mutasiTransaksi: {
        type: new GraphQLList(mutasiTransaksiType),
        description: 'daftar mutasi transaksi harian tablet'
      }
    }
  }
})

module.exports = rekapTransaksiTabletType
