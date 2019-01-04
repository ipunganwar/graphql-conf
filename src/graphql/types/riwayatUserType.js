const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString

exports.riwayatUserType = new GraphQLObjectType({
  name: 'riwayatUser',
  fields: () => {
    return {
      waktu_riwayat: {
        type: GraphQLString,
        description: 'waktu riwayat di catat'
      },
      aktifitas: {
        type: GraphQLString,
        description: 'penjelasan dari aktifitas'
      }
    }
  }
})
