const graphql                = require('graphql')
const GraphQLString          = graphql.GraphQLString
const GraphQLBoolean         = graphql.GraphQLBoolean
const GraphQLInputObjectType = graphql.GraphQLInputObjectType  
const GraphQLList            = graphql.GraphQLList
const jadwalMenuModel        = require('../../../models/').JadwalMenu
const jadwalMenuType         = require('../../types/jadwalMenuType').jadwalMenuType
const verifyTokenOutlet      = require('../../../helpers/verifyTokenOutlet')

const jadwalMenuObjectType = new GraphQLInputObjectType({
  name: 'jadwalMenuInput',
  fields: function () {
    return {
      kode_menu: {
        type: GraphQLString,
        description: 'Menu yang terdaftar'
      },
      tanggal_penetapan: {
        type: GraphQLString,
        description: 'Tanggal jadwal mulai diterapkan'
      },
      istirahat1: {
        type: GraphQLBoolean,
        description: 'Waktu Istirahat 1 Aktif/Nonaktif'
      },
      istirahat2: {
        type: GraphQLBoolean,
        description: 'Waktu Istirahat 2 Aktif/Nonaktif'
      },
      istirahat3: {
        type: GraphQLBoolean,
        description: 'Waktu Istirahat 3 Aktif/Nonaktif'
      },
      senin: {
        type: GraphQLBoolean,
        description: 'Hari Senin Aktif/Nonaktif'
      },
      selasa: {
        type: GraphQLBoolean,
        description: 'Hari Selasa Aktif/Nonaktif'
      },
      rabu: {
        type: GraphQLBoolean,
        description: 'Hari Rabu Aktif/Nonaktif'
      },
      kamis: {
        type: GraphQLBoolean,
        description: 'Hari Kamis Aktif/Nonaktif'
      },
      jumat: {
        type: GraphQLBoolean,
        description: 'Hari Jumat Aktif/Nonaktif'
      },
      sabtu: {
        type: GraphQLBoolean,
        description: 'Hari Sabtu Aktif/Nonaktif'
      },
      minggu: {
        type: GraphQLBoolean,
        description: 'Hari Minggu Aktif/Nonaktif'
      }
    }
  }
})

module.exports = {
  type: new GraphQLList(jadwalMenuType),
  args: {
    userToken: {type: GraphQLString},
    data_menu: {type: new GraphQLList(jadwalMenuObjectType)}
  },
  resolve: async(root, args) => {
    console.log('kudakudaan======================================')
    // console.log('masuk cuy', args.userToken);
    console.log('ada', args)
    const kode_outlet = verifyTokenOutlet(args.userToken) 

    if(kode_outlet) {
      try {
        args.data_menu.forEach((item) => {
          item.kode_outlet = kode_outlet
        })
        console.log('nih data menunya', args.data_menu);
        
        const newDataJadwalMenu = await jadwalMenuModel.insertMany(args.data_menu)

        return newDataJadwalMenu
      } catch (error) {
        throw new Error(error)
      }
    }

    return kode_outlet
  }
}