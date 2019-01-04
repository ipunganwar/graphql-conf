var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;

// User Type
exports.bahanType = new GraphQLObjectType({
  name: 'bahan',
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
        description: 'Id dari mongodb'
      },
      kode_bahan: {
        type: GraphQLString,
        resolve: (parentValue, args) => {
          return parentValue._id
        },
        description: 'Kode untuk bahan yang terdaftar di komposisi'
      },
      nama_bahan: {
        type: GraphQLString,
        description: 'Nama untuk bahan'
      },
      icon_bahan: {
        type: GraphQLString,
        description: 'Icon untuk bahan'
      },
    }
  }
});
