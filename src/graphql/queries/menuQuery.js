const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const menuType          = require('../types/menuType').menuType
const menuModel         = require('../../models/menuModel')
const outletModel       = require('../../models/outletModel')
const verifyTokenOutlet = require('../../helpers/verifyTokenOutlet')

const findAllMenu = {
  type: new GraphQLList(menuType),
  resolve: async () => {
    try {
      const allMenuData = await menuModel.find()
      return allMenuData
    } catch (e) {
      throw new Error(e)
    }
  }
}

const findMenuByIdOutlet = {
  type: new GraphQLList(menuType),
  args: {
    token: {type: GraphQLString}
  },
  resolve: async (parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        const outletData = await outletModel.findOne({ '_id' : kode_outlet})
        const menusData = await menuModel.find({ 'kode_kantin': outletData.kode_kantin })
        return menusData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}
module.exports = {
  findAllMenu,
  findMenuByIdOutlet
}
