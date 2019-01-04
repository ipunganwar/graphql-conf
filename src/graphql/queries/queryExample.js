var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var UserModel = require('../../models/modelsExample');
var userType = require('../types/typeExample').userType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function () {
          const users = UserModel.find().exec()
          if (!users) {
            throw new Error('Error')
          }
          return users
        },
        description: 'Get List of All Users'
      },
      userById: {
        type: userType,
        args: {id: {type: new GraphQLNonNull(GraphQLID)}},
        resolve: function (parentValue, args) {
          const user = UserModel.findOne({_id: args.id}).exec()
          if (!user) {
            throw new Error('Error')
          }
          return user
        },
        description: 'Get User by Id'
      }
    }
  },
  description: 'tutururuuu'
});
