var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;

// User Type
exports.notifikasiType = new GraphQLObjectType({
  name: 'notifikasi',
  fields: function () {
    return {
      _id: {
        type: GraphQLID,
        description: 'ID dari notifikasi'
      },
      tanggal_waktu: {
        type: GraphQLString,
        description: 'Tanggal Notifikasi diterima'
      },
      notifikasi: {
        type: GraphQLString,
        description: 'Isi notifikasi'
      },
      baca: {
        type: GraphQLString,
        description: 'Flag sudah dibaca atau belum'
      },
    }
  }
});
