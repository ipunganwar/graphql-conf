const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const GraphQLInt        = graphql.GraphQLInt
const GraphQLList       = graphql.GraphQLList
const rekeningType      = require('./rekeningType').rekeningType
const sekolahType      = require('./sekolahType').sekolahType
const kantinType      = require('./kantinType').kantinType
const riwayatUserType   = require('./riwayatUserType').riwayatUserType
const notifikasiType    = require('./notifikasiType').notifikasiType

exports.outletType = new GraphQLObjectType({
  name: 'outlet',
  fields: () => {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID outlet'
      },
      kode_outlet: {
        type: GraphQLString,
        description: 'Kode Outlet'
      },
      kode_kantin: {
        type: kantinType,
        description: 'kode kantin pemilik outlet'
      },
      kode_sekolah: {
        type: sekolahType,
        description: 'kode sekolah tempat outlet berada'
      },
      nama_outlet: {
        type: GraphQLString,
        description: 'nama outlet',
        resolve: (parentValue) => {
          return parentValue.nama_outlet
        }
      },
      no_telepon: {
        type: GraphQLString,
        description: 'nomor telepon dari outlet'
      },
      foto_pemilik: {
        type: GraphQLString,
        description: 'url foto pemilik outlet'
      },
      nama_pemilik: {
        type: GraphQLString,
        description: 'nama pemilik outlet'
      },
      alamat_pemilik: {
        type: GraphQLString,
        description: 'alamat pemilik outlet'
      },
      email_pemilik: {
        type: GraphQLString,
        description: 'email pemilik outlet'
      },
      saldo: {
        type: GraphQLInt,
        description: 'jumlah saldo pemilik outlet'
      },
      status: {
        type: GraphQLInt,
        description: 'status keaktivan outlet'
      },
      kode_perangkat: {
        type: GraphQLString,
        description: 'kode perangkat outlet'
      },
      rekening: {
        type: rekeningType,
        description: 'data rekening pemilik outlet'
      },
      riwayat_user: {
        type: new GraphQLList(riwayatUserType),
        description: 'data riwayat pemilik outlet'
      },
      notifikasi: {
        type: new GraphQLList(notifikasiType)
      }
    }
  }
})
