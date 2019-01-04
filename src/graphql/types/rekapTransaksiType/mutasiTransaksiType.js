const graphql                   = require('graphql')
const GraphQLObjectType         = graphql.GraphQLObjectType
const GraphQLString             = graphql.GraphQLString
const GraphQLInt                = graphql.GraphQLInt
const GraphQLList               = graphql.GraphQLList
const detailMutasiTransaksiType = require('./detailMutasiTransaksiType')

const mutasiTransaksiType = new GraphQLObjectType({
  name: 'mutasiTransaksi',
  fields: () => {
    return {
      idTransaksi: {
        type: GraphQLString,
        description: 'id transaksi outlet/kantin'
      },
      tanggalTransaksi: {
        type: GraphQLString,
        description: 'tanggal transaksi outlet/kantin'
      },
      jenisTransaksi: {
        type: GraphQLString,
        description: 'jenis dari transaksi outlet/kantin'
      },
      namaUser: {
        type: GraphQLString,
        description: 'nama user dalam transaksi outlet/kantin'
      },
      jumlahSaldo: {
        type: GraphQLInt,
        description: 'jumlah saldo dalam transaksi outlet/kantin'
      },
      nisn: {
        type: GraphQLString,
        description: 'nisn user'
      },
      peran: {
        type: GraphQLString,
        description: 'peran user dalam transaksi'
      },
      detailTransaksi: {
        type: new GraphQLList(detailMutasiTransaksiType),
        description: 'detail transaksi outlet/kantin'
      } 
    }
  }
})

module.exports = mutasiTransaksiType
