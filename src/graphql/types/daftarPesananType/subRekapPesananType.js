const graphql            = require('graphql')
const GraphQLObjectType  = graphql.GraphQLObjectType
const GraphQLString      = graphql.GraphQLString
const GraphQLInt         = graphql.GraphQLInt
const GraphQLList        = graphql.GraphQLList
const rekapPemesanType   = require('./rekapPemesanType')
// const rekapPembelianType = require('./berandaType/rekapPembelianType')
// const rekapPesananType   = require('./berandaType/rekapPesananType')

const subRekapPesananType = new GraphQLObjectType({
  name: 'subRekapPesananTablet',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        description: 'id menu yang dipesan'
      },
      name: {
        type: GraphQLString,
        description: 'nama menu yang dipesan'
      },
      category: {
        type: GraphQLString,
        description: 'kategori menu yang dipesan'
      },
      qty: {
        type: GraphQLInt,
        description: 'jumlah menu yang dipesan'
      },
      photo: {
        type: GraphQLString,
        description: 'url foto menu yang dipesan'
      },
      pemesan: {
        type: new GraphQLList(rekapPemesanType),
        description: 'rekap daftar pemesan menu'
      }
    }
  }
})

module.exports = subRekapPesananType
