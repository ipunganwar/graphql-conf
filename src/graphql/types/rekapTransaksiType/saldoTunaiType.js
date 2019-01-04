const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt

const saldoTunaiType = new GraphQLObjectType({
  name: 'saldoTunai',
  fields: () => {
    return {
      jumlahSaldo: {
        type: GraphQLInt,
        description: 'jumlah saldo yang ditransfer ke rekening outlet/kantin'
      },
      tanggalTransfer: {
        type: GraphQLString,
        description: 'tanggal transaksi saldo tunai'
      }
    }
  }
})

module.exports = saldoTunaiType
