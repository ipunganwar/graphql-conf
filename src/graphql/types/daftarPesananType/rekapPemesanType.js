const graphql            = require('graphql')
const GraphQLObjectType  = graphql.GraphQLObjectType
const GraphQLString      = graphql.GraphQLString
const GraphQLBoolean     = graphql.GraphQLBoolean

const rekapPemesanType = new GraphQLObjectType({
  name: 'rekapPemesan',
  fields: () => {
    return {
      nama: {
        type: GraphQLString,
        description: 'nama dari user pemesan pesanan'
      },
      nisn: {
        type: GraphQLString,
        description: 'nomor induk siswa nasional user pemesan'
      },
      status: {
        type: GraphQLBoolean,
        description: 'status terambilnya pesanan'
      }
    }
  }
})

module.exports = rekapPemesanType
