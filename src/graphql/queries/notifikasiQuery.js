const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const notifikasiType    = require('../types/notifikasiType').notifikasiType
const OutletModel       = require('../../models/outletModel')
const verifyTokenOutlet = require('../../helpers/verifyTokenOutlet')

const findNotifikasiByOutletId = {
  type: new GraphQLList(notifikasiType),
  args: {
    token: { type: GraphQLString },
  },
  resolve: async(parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        const notifikasisData = await OutletModel.findOne({ '_id': args.idOutlet }).select('notifikasi')
        return notifikasisData.notifikasi
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}

module.exports = {
  findNotifikasiByOutletId
}
