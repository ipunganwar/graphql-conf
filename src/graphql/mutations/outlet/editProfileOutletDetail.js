const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const OutletType        = require('../../types/outletType').outletType
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const OutletModel       = require('../../../models/outletModel')

module.exports = {
  type: OutletType,
  args: {
    token: { type: GraphQLString },
    no_telepon: { type: GraphQLString },
    alamat_pemilik: { type: GraphQLString },
    email_pemilik: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        const outletData = await OutletModel.findById(kode_outlet)
        outletData.no_telepon = args.no_telepon || outletData.no_telepon
        outletData.alamat_pemilik = args.alamat_pemilik || outletData.alamat_pemilik
        outletData.email_pemilik = args.email_pemilik || outletData.email_pemilik
        const newOutletData = await outletData.save()
        return newOutletData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}
