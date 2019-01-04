const graphql             = require('graphql')
const GraphQLObjectType   = graphql.GraphQLObjectType
const GraphQLList         = graphql.GraphQLList
const subPengembalianType = require('./subPengembalianType')

const subRekapPengembalianType = new GraphQLObjectType({
  name: 'subRekapPengembalian',
  fields: () => {
    return {
      istirahat1: {
        type: new GraphQLList(subPengembalianType),
        description: 'list pengembalian per istirahat 1'
      },
      istirahat2: {
        type: new GraphQLList(subPengembalianType),
        description: 'list pengembalian per istirahat 2'
      },
      istirahat3: {
        type: new GraphQLList(subPengembalianType),
        description: 'list pengembalian per istirahat 3'
      }
    }
  }
})

module.exports = subRekapPengembalianType
