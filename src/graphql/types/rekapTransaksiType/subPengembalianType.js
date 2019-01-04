const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt

const subPengembalianType = new GraphQLObjectType({
  name: 'subPengembalian',
  fields: () => {
    return {
      namaPembeli: {
        type: GraphQLString,
        description: 'nama user pengembalian pesanan'
      },
      saldoDikembalikan: {
        type: GraphQLInt,
        description: 'jumlah saldo yang dikembalikan ke user'
      }
    }
  }
})

module.exports = subPengembalianType
