const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt

exports.promoType = new GraphQLObjectType({
  name: 'promo',
  fields: () => {
    return {
      tanggal_awal: {
        type: GraphQLString,
        description: 'tanggal awal berlaku promo'
      },
      tanggal_akhir: {
        type: GraphQLString,
        description: 'tanggal akhir berlaku promo'
      },
      potongan: {
        type: GraphQLInt,
        description: 'jumlah potongan promo'
      },
      jenis_potongan: {
        type: GraphQLInt,
        description: ' jenis potongan, (0) persen | (1) nominal'
      }
    }
  }
})
