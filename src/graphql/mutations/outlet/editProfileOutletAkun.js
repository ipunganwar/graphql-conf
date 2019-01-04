const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const UserType          = require('../../types/userTabletType').userType
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const userModel         = require('../../../models/userTabletSchema')
const outletModel       = require('../../../models/outletModel')
const encrypt           = require('../../../helpers/cryptoHelper')

module.exports = {
  type: UserType,
  args: {
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        
        const userData = await userModel.findOne({ 'kode_referensi': kode_outlet })
        userData.username = args.username || userData.username
        if(args.password != 0) {
          userData.password = encrypt(args.password)
        }
        const newUserData = await userData.save()

        console.log('ni hasil', newUserData, args);
        
        return newUserData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}
