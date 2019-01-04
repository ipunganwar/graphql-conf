const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLInt        = graphql.GraphQLInt

const subRekapPesananType = new GraphQLObjectType({
  name: 'subRekapPesanan',
  fields: () => {
    return {
      makanan: {
        type: GraphQLInt,
        description: 'jumlah menu makanan dipesanan per waktu'
      },
      minuman: {
        type: GraphQLInt,
        description: 'jumlah menu minuman dipesan per waktu'
      },
      snack: {
        type: GraphQLInt,
        description: 'jumlah menu snack dipesan per waktu'
      }
    }
  }
})

module.exports = subRekapPesananType
