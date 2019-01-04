var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;

// User Type
exports.wilayahType = new GraphQLObjectType({
  name: 'wilayah',
  fields: function () {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Id dari mongodb'
      },
      kode_pos: {
        type: GraphQLString,
        description: 'yang mewakili wilayah dari sekolah yang terdaftar'
      },
      provinsi: {
        type: GraphQLString,
        description: 'Nama provinsi'
      },
      kota: {
        type: GraphQLString,
        description: 'Nama kota'
      },
      kecamatan: {
        type: GraphQLString,
        description: 'Nama kecamatan'
      },
    }
  }
});
