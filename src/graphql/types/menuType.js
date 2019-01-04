const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt
const GraphQLList       = graphql.GraphQLList
const bahanType         = require('./bahanType').bahanType
const promoType         = require('./promoType').promoType
const hargaType         = require('./hargaType').hargaType
const Bahan         = require('../../models/').Bahan

exports.menuType = new GraphQLObjectType({
  name: 'menu',
  fields: () => {
    return{
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'id dari menu'
      },
      kode_kantin: {
        type: GraphQLString,
        description: 'kode kantin pemilik menu'
      },
      nama_menu: {
        type: GraphQLString,
        description: 'nama menu'
      },
      jenis_menu: {
        type: GraphQLInt,
        description: 'jenis menu. *1=Makanan, 2=Minuman, 3=Snack'
      },
      foto_menu: {
        type: GraphQLString,
        description: 'url foto menu'
      },
      deskripsi: {
        type: GraphQLString,
        description: 'deskripsi dari menu'
      },
      tingkat_pedas: {
        type: GraphQLInt,
        description: 'tingkat kepedasan dari menu'
      },
      zat_besi: {
        type: GraphQLInt,
        description: 'jumlah kandungan zat besi'
      },
      protein: {
        type: GraphQLInt,
        description: 'jumlah kandungan protein'
      },
      karbohidrat: {
        type: GraphQLInt,
        description: 'jumlah kandungan karbohidrat'
      },
      kkal: {
        type: GraphQLInt,
        description: 'jumlah kalori dari makanan'
      },
      kolesterol: {
        type: GraphQLInt,
        description: 'jumlah kandungan kolesterol'
      },
      lemak: {
        type: GraphQLInt,
        description: 'jumlah kandungan lemak'
      },
      b1: {
        type: GraphQLInt,
        description: 'jumlah kandungan vitamin b1'
      },
      bahan: {
        type: new GraphQLList(bahanType),
        resolve: async function(parentValue, args) {
          let bahan = await Bahan.populate(parentValue, {path: 'bahan'})
          return bahan.bahan
        },
        description: 'deskripsi bahan menu'
      },
      harga: {
        type: new GraphQLList(hargaType),
        description: 'deskripsi harga menu'
      },
      promo: {
        type: new GraphQLList(promoType),
        description: 'deskripsi promo menu'
      }
    }
  }
})
