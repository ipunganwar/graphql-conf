const graphql             = require('graphql')
const GraphQLObjectType   = graphql.GraphQLObjectType
const GraphQLList         = graphql.GraphQLList
const transaksiDetailType = require('./transaksiDetailType').transaksiDetailType

exports.transaksiIstirahatType = new GraphQLObjectType({
  name: 'transaksiIstirahat',
  fields: () => {
    return {
      istirahat1: {
        type: new GraphQLList(transaksiDetailType),
        description: 'detail dari transaksi yang dipesan'
      },
      istirahat2: {
        type: new GraphQLList(transaksiDetailType),
        description: 'detail dari transaksi yang dipesan'
      },
      istirahat3: {
        type: new GraphQLList(transaksiDetailType),
        description: 'detail dari transaksi yang dipesan'
      }
    }
  }
})
