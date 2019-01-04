// Graphql Data type
const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLList       = graphql.GraphQLList
// Graphql Types
const outletType        = require('../types/outletType').outletType
// Models for database
const OutletModel       = require('../../models/outletModel')
const UserModel         = require('../../models/userTabletSchema')
const verifyTokenOutlet = require('../../helpers/verifyTokenOutlet')

const findAllOUtlet = {
  type: new GraphQLList(outletType),
  resolve: () => {
    try {
      const outlets = OutletModel.find()
      return outlets
    } catch (e) {
      throw new Error(e)
    }
  }
}

const findOutletById = {
  type: outletType,
  args: {
    userToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (parentValue, args) => {
    console.log('masukk oiii');
    
    const kode_outlet = verifyTokenOutlet(args.userToken)

    if(kode_outlet) {
      try {
        const outlet = await OutletModel.findOne({ _id: kode_outlet }).populate('kode_sekolah')
        
        return outlet
      } catch (e) {
        throw new Error(e)
      }
    }

    return kode_outlet
  }
}

module.exports = {
  findAllOUtlet,
  findOutletById
}
