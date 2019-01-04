const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const GraphQLBoolean    = graphql.GraphQLBoolean
const jadwalMenuModel   = require('../../../models/').JadwalMenu
const jadwalMenuType    = require('../../types/jadwalMenuType').jadwalMenuType
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')


module.exports = {
  type: jadwalMenuType,
  args: {
    userToken: {type: GraphQLString},
    kode_menu: {type: GraphQLString},
    istirahat1: {type: GraphQLBoolean},
    istirahat2: {type: GraphQLBoolean},
    istirahat3: {type: GraphQLBoolean},
    senin: {type: GraphQLBoolean},
    selasa: {type: GraphQLBoolean},
    rabu: {type: GraphQLBoolean},
    kamis: {type: GraphQLBoolean},
    jumat: {type: GraphQLBoolean},
    tanggal_penetapan: {type: GraphQLString}
  },
  resolve: async(root, args) => {
    const kode_outlet = verifyTokenOutlet(args.userToken)
    console.log('coba ya', args.tanggal_penetapan);
    let newTanggalPenetapan = new Date(args.tanggal_penetapan)
    newTanggalPenetapan.setDate(newTanggalPenetapan.getDate() + 6)
    if(kode_outlet) {
      const newJadwalMenu = new jadwalMenuModel({
        kode_outlet: kode_outlet,
        kode_menu: args.kode_menu,
        tanggal_penetapan: newTanggalPenetapan,
        istirahat1: args.istirahat1,
        istirahat2: args.istirahat2,
        istirahat3: args.istirahat3,
        senin: args.senin,
        selasa: args.selasa,
        rabu: args.rabu,
        kamis: args.kamis,
        jumat: args.jumat,
        sabtu: false,
        minggu: false
      })

      try {
        const newDataJadwalMenu = await newJadwalMenu.save()

        return newDataJadwalMenu
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}