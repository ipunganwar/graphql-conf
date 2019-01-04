// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
// Graphql Types
const pelangganType = require('../../types/pelangganType').pelangganType
const jadwalTutupType = require('../../types/jadwalTutupType').jadwalTutupType;
// Models for database
const Pelanggan = require('../../../models/').Pelanggan
const JadwalTutup = require('../../../models/').JadwalTutup
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')
const dayConverter = require('../../../helpers/dateConverter').dayConverter
const monthConverter = require('../../../helpers/dateConverter').monthConverter

const jadwal = {
  type: new GraphQLList(jadwalTutupType),
  args: {token: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      let kode_sekolah = await Pelanggan.findOne({_id: kode_pelanggan})
      kode_sekolah = kode_sekolah.kode_sekolah
      let d = new Date()
      let hEnam = d.setDate(d.getDate() + 6)
      let jadwalFull = []
      let jadwal = await JadwalTutup.find({kode_sekolah: kode_sekolah, tanggal_tutup: { $gte: new Date(), $lte: new Date(hEnam)}}).populate("kode_sekolah")
      for(let i=-1;i<5;i++) {
        d = new Date()
        d.setDate(d.getDate() + i)
        let tempDate = new Date(d)
        let obj = {
          kode_sekolah: args.kode_sekolah,
          tanggal_tutup: tempDate,
          date: tempDate.getDate(),
          day: dayConverter(tempDate),
          month: monthConverter(tempDate),
          year: tempDate.getFullYear(),
          active: true
        }
        for (let j=0;j<jadwal.length;j++) {
          let currentTanggal = new Date(tempDate.getYear(), tempDate.getMonth(), tempDate.getDate())
          let tanggalDb = new Date(jadwal[j].tanggal_tutup.getYear(), jadwal[j].tanggal_tutup.getMonth(), jadwal[j].tanggal_tutup.getDate())
          if (currentTanggal.getTime() == tanggalDb.getTime()) {
            obj.active = false
          }
        }
        jadwalFull.push(obj)
      }
      return jadwalFull
    } else {
      throw new Error('Not Authorized')
    }
  }
}

module.exports = {
  jadwal
};
