var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
const sekolahType = require('./sekolahType').sekolahType

// User Type
exports.jadwalTutupType = new GraphQLObjectType({
  name: 'jadwalTutup',
  fields: function () {
    return {
      kode_sekolah: {
        type: sekolahType,
        description: 'Kode untuk sekolah yang terdaftar'
      },
      tanggal_tutup: {
        type: GraphQLString,
        description: 'Tanggal tidak beroperasinya sekolah'
      },
      date: {
        type: GraphQLString,
        description: 'Tanggal berdasarkan tanggal_tutup'
      },
      active: {
        type: GraphQLBoolean,
        description: 'Status tanggal aktif atau tidak'
      },
      day: {
        type: GraphQLString,
        description: 'Hari berdasarkan tanggal_tutup'
      },
      month: {
        type: GraphQLString,
        description: 'Bulan berdasarkan tanggal_tutup'
      },
      year: {
        type: GraphQLString,
        description: 'Tahun tidak beroperasinya sekolah'
      },
    }
  }
});
