const graphql               = require('graphql')
const GraphQLObjectType     = graphql.GraphQLObjectType
const subRekapPesananType = require('./subRekapPesananType')

const rekapPesananType = new GraphQLObjectType({
  name: 'rekapPesanan',
  fields: () => {
    return {
      semua: {
        type: subRekapPesananType,
        description: 'rekap menu dipesan per hari'
      },
      istirahat1: {
        type: subRekapPesananType,
        description: 'rekap menu dipesan per istirahat 1'
      },
      istirahat2: {
        type: subRekapPesananType,
        description: 'rekap menu dipesan per istirahat 2'
      },
      istirahat3: {
        type: subRekapPesananType,
        description: 'rekap menu dipesan per istirahat 3'
      }
    }
  }
})

module.exports = rekapPesananType
