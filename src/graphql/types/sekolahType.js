var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var wilayahType = require('./wilayahType').wilayahType;
var Wilayah = require('../../models/').Wilayah

// User Type
exports.sekolahType = new GraphQLObjectType({
  name: 'sekolah',
  fields: function () {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Id dari mongodb'
      },
      nama_sekolah: {
        type: GraphQLString,
        description: 'Nama untuk sekolah yang terdaftar'
      },
      kode_sekolah: {
        type: GraphQLString,
        description: 'Nomor Pokok Sekolah Nasional, dan sebagai username untuk sekolah'
      },
      password: {
        type: GraphQLString,
        description: 'Kata sandi untuk sekolah melakukan login'
      },
      jenjang: {
        type: GraphQLString,
        description: 'Jenjang pendidikan dari sekolah yang terdaftar'
      },
      no_telp: {
        type: GraphQLString,
        description: 'No telp dari sekolah yang terdaftar'
      },
      alamat_sekolah: {
        type: GraphQLString,
        description: 'Alamat sekolah yang terdaftar'
      },
      kode_pos: {
        type: wilayahType,
        resolve: function (parentValue, args) {
          const wilayah = Wilayah.findOne({
            "_id": parentValue.kode_pos
          })
          return wilayah
        },
        description: 'Data wilayah dari sekolah yang terdaftar'
      },
      // potongan: {
      //   type: GraphQLList,
      //   description: 'Data potongan dari sekolah yang terdaftar'
      // },
      // fee: {
      //   type: GraphQLList,
      //   description: 'Data fee dari sekolah yang terdaftar'
      // },
    }
  }
});
