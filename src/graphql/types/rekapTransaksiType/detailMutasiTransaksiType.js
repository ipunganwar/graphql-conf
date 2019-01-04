const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString     = graphql.GraphQLString
const GraphQLList       = graphql.GraphQLList
const GraphQLInt        = graphql.GraphQLInt

const detailMutasiTransaksiType = new GraphQLObjectType({
  name: 'detailMutasiTransaksi',
  fields: () => {
    return {
      jenisTransaksi: {
        type: GraphQLString,
        description: 'jenis transaksi user'
      },
      urlGambarMenu: {
        type: GraphQLString,
        description: 'url dari gambar menu dipesan'
      },
      namaMenu: {
        type: GraphQLString,
        description: 'nama menu yang dipesan user'
      },
      jumlahMenu: {
        type: GraphQLInt,
        description: 'jumlah menu yang dipesan user'
      },
      hargaMenu: {
        type: GraphQLInt,
        description: 'harga menu yang dipesan user'
      },
      jam_istirahat: {
        type: GraphQLInt,
        description: 'jam istirahat transaksi outlet/kantin'
      },
      akunTujuan: {
        type: GraphQLString,
        description: 'akun bank outlet/kantin'
      },
      atasNama: {
        type: GraphQLString,
        description: 'nama pemilik rekening outlet/kantin'
      }
    }
  }
})

module.exports = detailMutasiTransaksiType
