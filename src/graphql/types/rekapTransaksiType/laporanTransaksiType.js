const graphql                  = require('graphql')
const GraphQLObjectType        = graphql.GraphQLObjectType
const GraphQLString            = graphql.GraphQLString
const GraphQLInt               = graphql.GraphQLInt
const subSaldoKreditType       = require('./subSaldoKreditType')
const subRekapPengembalianType = require('./subRekapPengembalianType')
const saldoTunaiType           = require('./saldoTunaiType')

const laporanTransaksiType = new GraphQLObjectType({
  name: 'laporanTransaksi',
  fields: () => {
    return {
      saldoAwal: {
        type: GraphQLInt,
        description: 'saldo awal transaksi per hari'
      },
      saldoKredit: {
        type: subSaldoKreditType,
        description: 'rekap transaksi kredit tablet per hari'
      },
      pengembalian: {
        type: subRekapPengembalianType,
        description: 'rekap pengembalian pesanan per hari'
      },
      saldoTunai: {
        type: saldoTunaiType,
        description: 'detail saldo tunai per hari'
      }
    }
  }
})

module.exports = laporanTransaksiType
