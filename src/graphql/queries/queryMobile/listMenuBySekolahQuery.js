// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
// Graphql Types
const jadwalMenuType = require('../../types/jadwalMenuType').jadwalMenuType
// Models for database
const JadwalMenu = require('../../../models/').JadwalMenu
const Sekolah = require('../../../models/').Sekolah
const Pelanggan = require('../../../models/').Pelanggan
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const listMenuBySekolah = {
  type: new GraphQLList(jadwalMenuType),
  args: {token: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    try {
      let date00 = new Date()
      date00.setHours(00)
      date00.setMinutes(00)
      date00.setSeconds(00)
      date00.setMilliseconds(00)
      let tanggal6HariKedepan = date00.setDate(date00.getDate() + 5)
      tanggal6HariKedepan = new Date(tanggal6HariKedepan)
      tanggal6HariKedepan.setHours(23)
      tanggal6HariKedepan.setMinutes(59)
      tanggal6HariKedepan.setSeconds(59)
      tanggal6HariKedepan.setMilliseconds(999)
      let kode_pelanggan = verifyTokenPelanggan(args.token)
      if (kode_pelanggan) {
        let dataPelanggan = await Pelanggan.findOne({_id: kode_pelanggan})
        let kodeSekolahDariPelanggan = dataPelanggan.kode_sekolah
        let jadwalMenu = await JadwalMenu.find({tanggal_penetapan: {$lte: tanggal6HariKedepan}}).populate('kode_menu kode_outlet').sort({tanggal_penetapan: 'descending'})
        let filterBySekolah = jadwalMenu.filter((data, index) => {
          if (data.kode_outlet) {
            if (data.kode_outlet.kode_sekolah === kodeSekolahDariPelanggan) {
              return data
            }
          }
        })
        let tanggalSebelumHariIniLebihDariSatu = []
        filterBySekolah = filterBySekolah.filter((item) => {
          let tanggalSekarang = new Date()
          tanggalSekarang.setHours(00)
          tanggalSekarang.setMinutes(00)
          tanggalSekarang.setSeconds(00)
          tanggalSekarang.setMilliseconds(00)
          if (new Date(item.tanggal_penetapan) <= tanggalSekarang) {
            let menuDanOutlet = item.kode_menu + '#' + item.kode_outlet
            if (tanggalSebelumHariIniLebihDariSatu.indexOf(menuDanOutlet) == -1) {
              tanggalSebelumHariIniLebihDariSatu.push(menuDanOutlet)
              return item
            }
          } else {
            return item
          }
        })
        let returnedData = await Sekolah.populate(filterBySekolah, {path: "kode_outlet.kode_sekolah"})
        for (var i = 0; i < returnedData.length; i++) {
          returnedData[i].kode_menu.harga.sort(function(a,b) {return (new Date(a.tanggal_penetapan) < new Date(b.tanggal_penetapan)) ? 1 : ((new Date(b.tanggal_penetapan) < new Date(a.tanggal_penetapan)) ? -1 : 0);} );
          let tanggalSebelumHariIniLebihDariSatu = false
          returnedData[i].kode_menu.harga = returnedData[i].kode_menu.harga.filter((item) => {
            let tanggalSekarang = new Date()
            tanggalSekarang.setHours(00)
            tanggalSekarang.setMinutes(00)
            tanggalSekarang.setSeconds(00)
            tanggalSekarang.setMilliseconds(00)
            if (new Date(item.tanggal_penetapan) <= tanggalSekarang) {
              if (!tanggalSebelumHariIniLebihDariSatu) {
                tanggalSebelumHariIniLebihDariSatu = true
                return item
              }
            } else {
              return item
            }
          })
        }
        return returnedData
      } else {
        throw new Error('Not Authorized')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = {
  listMenuBySekolah
};
