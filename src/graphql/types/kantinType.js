var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;

// User Type
exports.kantinType = new GraphQLObjectType({
  name: 'kantin',
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
        description: 'Id dari mongodb'
      },
      tanggal_register: {
        type: GraphQLString,
        description: 'Tanggal registrasi kantin'
      },
      nama_kantin: {
        type: GraphQLString,
        description: 'Nama dari kantin'
      },
      no_telepon: {
        type: GraphQLString,
        description: 'No telepon kantin'
      },
      foto_kantin: {
        type: GraphQLString,
        description: 'Banner foto kantin'
      },
    }
  }
});
