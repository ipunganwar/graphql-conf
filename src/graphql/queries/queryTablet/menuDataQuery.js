const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLID         = graphql.GraphQLID
const GraphQLString     = graphql.GraphQLString
const menuType          = require('../../types/menuType').menuType
const jadwalMenuType    = require('../../types/jadwalMenuType').jadwalMenuType
const jadwalMenuModel   = require('../../../models/').JadwalMenu
const menuModel         = require('../../../models/menuModel')
const outletModel       = require('../../../models/outletModel')
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')

const getMenuDataByIdOutlet = {
  type: new GraphQLList(jadwalMenuType),
  args: {
    userToken: {type: GraphQLString},
    tanggalPenetapan: {type: GraphQLString}
  },
  resolve: async function(parentValue, args) {

    const kode_outlet = verifyTokenOutlet(args.userToken)
    let dataMenu = []
    if(kode_outlet) {
      const outletData = await outletModel.findOne({ '_id' : kode_outlet})
      const menusData = await menuModel.find({ 'kode_kantin': outletData.kode_kantin })

      for(let j=0; j<menusData.length; j ++) {
        let tempJadwalMenu = await jadwalMenuModel.find({kode_menu: menusData[j]._id}).populate('kode_menu').populate('kode_outlet')
        
        tempJadwalMenu.sort((a,b) => {
          return new Date(b.tanggal_penetapan) - new Date(a.tanggal_penetapan)
        })
        let kudakudaan = new Date(args.tanggalPenetapan)
        kudakudaan.setDate(kudakudaan.getDate() + 1)
        
        for(let i=0; i< tempJadwalMenu.length; i++) {
          if(tempJadwalMenu[i].tanggal_penetapan <= kudakudaan) {
            tempJadwalMenu[i].kode_menu._id = menusData[j]._id
            
            dataMenu.push(tempJadwalMenu[i])


            i = tempJadwalMenu.length
          }
        }
      }

      return dataMenu
    }

    return kode_outlet
  }
}

module.exports = {
  getMenuDataByIdOutlet
}
