const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt

const subRekapPembelianType = new GraphQLObjectType({
  name: 'subRekapPembelian',
  fields: () => {
    return {
      menuDibeli: {
        type: GraphQLInt,
        description: 'jumlah menu yang telah dibeli'
      },
      pembeli: {
        type: GraphQLInt,
        description: 'jumlah pembeli dalam transaksi per waktu'
      },
      belumDiambil: {
        type: GraphQLInt,
        description: 'jumlah menu dipesan yang belum diambil'
      }
    }
  }
})

module.exports = subRekapPembelianType
