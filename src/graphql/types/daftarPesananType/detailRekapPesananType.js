const graphql             = require('graphql')
const GraphQLObjectType   = graphql.GraphQLObjectType
const GraphQLInt          = graphql.GraphQLInt
const GraphQLList         = graphql.GraphQLList
const subRekapPesananType = require('./subRekapPesananType')

const detailRekapPesananType = new GraphQLObjectType({
  name: 'detailRekapPesanan',
  fields: () => {
    return {
      jumlahMakanan: {
        type: GraphQLInt,
        description: 'jumlah menu makanan yang dipesan'
      },
      jumlahMinuman: {
        type: GraphQLInt,
        description: 'jumlah menu minuman yang dipesan'
      },
      jumlahSnack: {
        type: GraphQLInt,
        description: 'jumlah menu snack yang dipesan'
      },
      rekapPesanan: {
        type: new GraphQLList(subRekapPesananType),
        description: 'rekap dafta pesanan'
      }
    }
  }
})

module.exports = detailRekapPesananType
