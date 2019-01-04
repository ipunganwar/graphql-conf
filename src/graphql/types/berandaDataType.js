const graphql            = require('graphql')
const GraphQLObjectType  = graphql.GraphQLObjectType
const GraphQLString      = graphql.GraphQLString
const GraphQLInt         = graphql.GraphQLInt
const rekapTransaksiType = require('./berandaType/rekapTransaksiType')
const rekapPembelianType = require('./berandaType/rekapPembelianType')
const rekapPesananType   = require('./berandaType/rekapPesananType')

const berandaDataType = new GraphQLObjectType({
  name: 'berandaData',
  fields: () => {
    return {
      tanggalTransaksi: {
        type: GraphQLString,
        description: 'tanggal rekap transaksi'
      },
      rincianTransaksi: {
        type: rekapTransaksiType,
        description: 'rekap saldo transaksi per hari'
      },
      rincianPembelian: {
        type: rekapPembelianType,
        description: 'rekap transaksi pembelian per hari'
      },
      statusPesanan: {
        type: rekapPesananType,
        description: 'rekap menu dipesan per hari'
      }
    }
  }
})

module.exports = berandaDataType
