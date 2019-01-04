const graphql           = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLNonNull    = graphql.GraphQLNonNull;
const GraphQLID         = graphql.GraphQLID;
const GraphQLString     = graphql.GraphQLString;
const GraphQLInt        = graphql.GraphQLInt;

// User Type
exports.userType = new GraphQLObjectType({
  name: 'userTablet',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Id dari mongodb'
      },
      username: {
        type: GraphQLString,
        description: 'username dari katin atau otlet'
      },
      password: {
        type: GraphQLString,
        description: 'password dari kantin atau otlet'
      },
      kode_referensi: {
        type: GraphQLString,
        description: 'kode unik dari kantin atau otlet'
      },
      tipe_user: {
        type: GraphQLInt,
        description: 'tipe dari user, (1) kantin | (2) otlet'
      }
    }
  }
});
