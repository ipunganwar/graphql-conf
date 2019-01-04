const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const OutletType        = require('../../types/outletType').outletType
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const OutletModel       = require('../../../models/outletModel')

module.exports = {
  type: OutletType,
  args: {
    token: { type: GraphQLString },
    atas_nama: { type: GraphQLString },
    nama_bank: { type: GraphQLString },
    no_rekening: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        const outletData = await OutletModel.findById(kode_outlet)

        if(args.atas_nama != 0) {
          outletData.rekening.atas_nama = args.atas_nama
        }

        if(args.nama_bank != 0) {
          outletData.rekening.nama_bank = args.nama_bank
        }

        if(args.no_rekening != 0) {
          outletData.rekening.no_rekening = args.no_rekening
        }
        
        const newOutletData = await outletData.save()

        console.log('ada coy', newOutletData);
        
        return newOutletData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}
