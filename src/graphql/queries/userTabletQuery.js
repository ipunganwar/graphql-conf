const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const UserModel         = require('../../models/userTabletSchema')
const userType          = require('../types/userTabletType').userType
const verifyTokenOutlet = require('../../helpers/verifyTokenOutlet')

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function (parent, args, context, info) {
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
        args: {
          token: {type: GraphQLString}
        },
        resolve: async (parentValue, args) => {
          const kode_outlet = verifyTokenOutlet(args.token)
          if(kode_outlet) {
            try {
              const outletData = await UserModel.findOne({kode_referensi: kode_outlet})
              return outletData
            } catch (e) {
              throw new Error(e)
            }
          }
          return kode_outlet
        },
        description: 'Get User by Id'
      }
    }
  },
  description: 'tutururuuu'
});
