// dependencies
const moment = require('moment-timezone')
// Graphql Data type
const graphql = require('graphql')
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
// Graphql Types
const transaksiType = require('../../types/transaksiType').transaksiType
// Models for database
const Transaksi = require('../../../models').Transaksi
// Helpers
const verifyTokenPelanggan = require('../../../helpers/verifyTokenPelanggan')

const listMyOrders = {
  type: new GraphQLList(transaksiType),
  args: {token: {type: GraphQLString}},
  resolve: async function (parentValue, args) {
    let kode_pelanggan = verifyTokenPelanggan(args.token)
    if (kode_pelanggan) {
      let d = new Date()
      // let date00 = new Date()
      // date00.setHours(00)
      // date00.setMinutes(00)
      // date00.setSeconds(00)
      // date00.setMilliseconds(00)
      let date00 = moment().tz('Asia/Jakarta').startOf('day')
      let hEnam = moment().tz('Asia/Jakarta').startOf('day')
      hEnam.add(6, 'days')
      // let hEnam = d.setDate(d.getDate() + 6)
      // hEnam = new Date(hEnam)
      // hEnam.setHours(23)
      // hEnam.setMinutes(59)
      // hEnam.setSeconds(59)
      // hEnam.setMilliseconds(999)
      const transaksi = await Transaksi.find({kode_pelanggan: kode_pelanggan, jenis_transaksi: 0, tanggal_ambil: {$gte: date00, $lte: hEnam}}).populate('kode_pelanggan kode_outlet transaksi_detail.kode_menu')
      let transaksiPisah = []
      let returnedTransaksi = []
      transaksi.forEach((items) => {
        items.transaksi_detail.map((item, index) => {
          item.kode_transaksi = items._id
          item.kode_outlet = items.kode_outlet.kode_outlet
        })
      })
      for (var i = 0; i < transaksi.length; i++) {
        let gabunganTanggalDanIdOutlet = transaksi[i].tanggal_ambil.getDate().toString() + transaksi[i].tanggal_ambil.getMonth().toString() + transaksi[i].tanggal_ambil.getYear().toString()
        gabunganTanggalDanIdOutlet += transaksi[i].kode_outlet.kode_outlet
        if (transaksiPisah.indexOf(gabunganTanggalDanIdOutlet) > -1) {
          returnedTransaksi[transaksiPisah.indexOf(gabunganTanggalDanIdOutlet)].transaksi_detail = [...returnedTransaksi[transaksiPisah.indexOf(gabunganTanggalDanIdOutlet)].transaksi_detail, ...transaksi[i].transaksi_detail]
        } else {
          transaksiPisah.push(gabunganTanggalDanIdOutlet)
          returnedTransaksi.push(transaksi[i])
        }
      }
      for (var i = 0; i < returnedTransaksi.length; i++) {
        let gabunganTransaksiDetailMenuYgAda = []
        let gabunganTransaksiDetail = []
        for (var j = 0; j < returnedTransaksi[i].transaksi_detail.length; j++) {
          let kodeMenuDanJamIstirahat = returnedTransaksi[i].transaksi_detail[j].kode_menu + '#' + returnedTransaksi[i].transaksi_detail[j].jam_istirahat
          if (gabunganTransaksiDetailMenuYgAda.indexOf(kodeMenuDanJamIstirahat) > -1) {
            if (returnedTransaksi[i].transaksi_detail[j].jumlah_pesan - (returnedTransaksi[i].transaksi_detail[j].jumlah_ambil + returnedTransaksi[i].transaksi_detail[j].jumlah_kembali) > 0) {
              let temp = gabunganTransaksiDetail[gabunganTransaksiDetailMenuYgAda.indexOf(kodeMenuDanJamIstirahat)]
              temp.jumlah_pesan += returnedTransaksi[i].transaksi_detail[j].jumlah_pesan
              temp.jumlah_ambil += returnedTransaksi[i].transaksi_detail[j].jumlah_ambil
              temp.jumlah_kembali += returnedTransaksi[i].transaksi_detail[j].jumlah_kembali
              temp.kode_transaksi += '#' + returnedTransaksi[i].transaksi_detail[j].kode_transaksi
            }
          } else {
            if (returnedTransaksi[i].transaksi_detail[j].jumlah_pesan - (returnedTransaksi[i].transaksi_detail[j].jumlah_ambil + returnedTransaksi[i].transaksi_detail[j].jumlah_kembali) > 0) {
              gabunganTransaksiDetailMenuYgAda.push(kodeMenuDanJamIstirahat)
              gabunganTransaksiDetail.push(returnedTransaksi[i].transaksi_detail[j])
            }
          }
        }
        returnedTransaksi[i].transaksi_detail = gabunganTransaksiDetail
      }
      return returnedTransaksi
    } else {
      throw new Error('Not Authorized')
    }
  },
  description: 'List orders aplikasi yg dimiliki pengguna'
}

module.exports = {
  listMyOrders
};
