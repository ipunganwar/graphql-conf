const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const UserModel         = require('../../../models/userTabletSchema')
const userType          = require('../../types/userTabletType').userType
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')

const getUserTabletData = {
  type: userType,
  args: {
    token: {type: GraphQLString}
  },
  resolve: async (parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    
    if(kode_outlet) {
      try {
        const userTabletData = await UserModel.findOne({kode_referensi: kode_outlet})
        return userTabletData
      } catch (e) {
        throw new Error(e)
      }
    }

    return kode_outlet    
  }
}

module.exports = getUserTabletData