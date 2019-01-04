const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt
const subRekapMenuType  = require('./subRekapMenuType')

const subTransaksiKreditType = new GraphQLObjectType({
  name: 'subTransaksiKredit',
  fields: () => {
    return {
      menuMakanan: {
        type: subRekapMenuType,
        description: 'rekap transaksi menu makanan per waktu istirahat'   
      },
      menuMinuman: {
        type: subRekapMenuType,
        description: 'rekap transaksi menu minuman per waktu istirahat'
      },
      menuSnack: {
        type: subRekapMenuType,
        description: 'rekap transaksi menu snack per waktu istirahat'
      },
      penjualanAplikasi: {
        type: GraphQLInt,
        description: 'total saldo transaksi aplikasi per waktu istirahat'
      },
      penjualanKasir: {
        type: subRekapMenuType,
        description: 'rekap transaksi kasir per waktu istirahat'
      }
    }
  }
})

module.exports = subTransaksiKreditType
