var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var sekolahType = require('./sekolahType').sekolahType;
var notifikasiType = require('./notifikasiType').notifikasiType;

// User Type
exports.pelangganType = new GraphQLObjectType({
  name: 'pelanggan',
  fields: function () {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Id dari mongodb'
      },
      kode_sekolah: {
        type: sekolahType,
        description: 'Data Sekolah dari pengguna'
      },
      kode_pelanggan: {
        type: GraphQLString,
        description: 'Kode Pelanggan dari pengguna'
      },
      kelas: {
        type: GraphQLString,
        description: 'Kelas / tingkat dari user'
      },
      username: {
        type: GraphQLString,
        description: 'NISN untuk user siswa NIP untuk user karyawan dengan status karyawan tetap NIP- sementara untuk user karyawan dengan status karyawan honorer'
      },
      password: {
        type: GraphQLString,
        description: 'Kata sandi yang digunakan user untuk login'
      },
      foto_pelanggan: {
        type: GraphQLString,
        description: 'Foto profile user'
      },
      nama_pelanggan: {
        type: GraphQLString,
        description: 'Nama dari pengguna'
      },
      peran: {
        type: GraphQLInt,
        description: 'Peran dari pengguna, *1=sd, 2=smp, 3=sma, 4=karyawan'
      },
      saldo: {
        type: GraphQLInt,
        description: 'Saldo dari pengguna'
      },
      notifikasi: {
        type: new GraphQLList(notifikasiType),
        description: 'List notifikasi dari pengguna'
      },
      email: {
        type: GraphQLString,
        description: 'Email dari pengguna'
      },
      alamat: {
        type: GraphQLString,
        description: 'Alamat dari pengguna'
      }
    }
  }
});
