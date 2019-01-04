const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString

exports.rekeningType = new GraphQLObjectType({
  name: 'rekening',
  fields: () => {
    return {
      nama_bank: {
        type: GraphQLString,
        description: 'nama bank dari pemilik outlet'
      },
      no_rekening: {
        type: GraphQLString,
        description: 'nomor rekening pemilik outlet'
      },
      atas_nama: {
        type: GraphQLString,
        description: 'nama pemilik rekening'
      },
      tanggal_simpan: {
        type: GraphQLString,
        description: 'tanggal terakhir perubahan data rekening'
      }
    }
  }
})
