const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt

exports.hargaType = new GraphQLObjectType({
  name: 'harga',
  fields: () => {
    return {
      tanggal_penetapan: {
        type: GraphQLString,
        description: 'tanggal penetapan harga'
      },
      harga: {
        type: GraphQLInt,
        description: 'harga dari menu'
      }
    }
  }
})
