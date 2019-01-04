var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var axios = require('axios')
var Topup = require('../../models/').Topup
var Transaksi = require('../../models/').Transaksi
const transaksiType = require('./transaksiType').transaksiType
const topupType = require('./topupType').topupType
// User Type
exports.transaksiListType = new GraphQLObjectType({
  name: 'transaksiList',
  fields: function () {
    return {
      aplikasi: {
        type: new GraphQLList(transaksiType),
        resolve: async function (parentValue, args) {
          let transaksi = await Transaksi.find({kode_pelanggan: parentValue, jenis_transaksi: 0}).populate('transaksi_detail.kode_menu kode_outlet')
          transaksi = transaksi.sort(function (a, b) {
            return a.created_at < b.created_at ? 1 : -1;
          });
          let axiosPostList = []
          for (var i = 0; i < transaksi.length; i++) {
            let url = process.env.WALLET_API+"?methods=mutasiTransaksi"
            let data = JSON.stringify({
              kode_pelanggan: parentValue,
              kode_transaksi: transaksi[i]._id,
              jenis_transaksi: 'Pembayaran'
            })
            let temp = axios.post(url, data, {headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            }})
            axiosPostList.push(temp)
          }
          try {
            let resultOfAxiosPost = await Promise.all(axiosPostList)
            for (var i = 0; i < resultOfAxiosPost.length; i++) {
              transaksi[i].saldo_akhir = resultOfAxiosPost[i].data[0] ? resultOfAxiosPost[i].data[0].saldo_akhir : 0
            }
          } catch (e) {
            console.log(e)
          }
          return transaksi
        },
        description: 'List transaksi yg dipesan di dalam aplikasi'
      },
      kasir: {
        type: new GraphQLList(transaksiType),
        resolve: async function (parentValue, args) {
          let transaksi = await Transaksi.find({kode_pelanggan: parentValue, jenis_transaksi: 1}).populate('transaksi_detail.kode_menu kode_outlet')
          transaksi = transaksi.sort(function (a, b) {
            return a.created_at < b.created_at ? 1 : -1;
          });
          let axiosPostList = []
          for (var i = 0; i < transaksi.length; i++) {
            let url = process.env.WALLET_API+"?methods=mutasiTransaksi"
            let data = JSON.stringify({
              kode_pelanggan: parentValue,
              kode_transaksi: transaksi[i]._id,
              jenis_transaksi: 'Pembayaran'
            })
            let temp = axios.post(url, data, {headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            }})
            axiosPostList.push(temp)
          }
          try {
            let resultOfAxiosPost = await Promise.all(axiosPostList)
            for (var i = 0; i < resultOfAxiosPost.length; i++) {
              transaksi[i].saldo_akhir = resultOfAxiosPost[i].data[0] ? resultOfAxiosPost[i].data[0].saldo_akhir : 0
            }
          } catch (e) {
            console.log(e)
          }
          return transaksi
        },
        description: 'List transaksi yg dipesan di dalam kasir'
      },
      topup: {
        type: new GraphQLList(topupType),
        resolve: async function (parentValue, args) {
          let topup = await Topup.find({kode_pelanggan: parentValue, status: 1}).populate("kode_pelanggan")
          topup = topup.sort(function (a, b) {
            return a.tanggal_waktu < b.tanggal_waktu ? 1 : -1;
          });
          let axiosPostList = []
          for (var i = 0; i < topup.length; i++) {
            let url = process.env.WALLET_API+"?methods=mutasiTransaksi"
            let data = JSON.stringify({
              kode_pelanggan: parentValue,
              kode_transaksi: topup[i]._id,
              jenis_transaksi: 'Topup'
            })
            let temp = axios.post(url, data, {headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            }})
            axiosPostList.push(temp)
          }
          try {
            let resultOfAxiosPost = await Promise.all(axiosPostList)
            for (var i = 0; i < resultOfAxiosPost.length; i++) {
              topup[i].saldo_akhir = resultOfAxiosPost[i].data[0] ? resultOfAxiosPost[i].data[0].saldo_akhir : 0
            }
          } catch (e) {
            console.log(e)
            console.log('========================================================')
          }
          return topup
        },
        description: 'List topup transaksi'
      },
      pengembalian: {
        type: new GraphQLList(transaksiType),
        resolve: async function (parentValue, args) {
          let transaksi = await Transaksi.find({kode_pelanggan: parentValue, jenis_transaksi: 0, "transaksi_detail.jumlah_kembali": {$gt: 0}}).populate('transaksi_detail.kode_menu kode_outlet')
          transaksi = transaksi.sort(function (a, b) {
            return a.updated_at < b.updated_at ? 1 : -1;
          });
          let axiosPostList = []
          for (var i = 0; i < transaksi.length; i++) {
            let url = process.env.WALLET_API+"?methods=mutasiTransaksi"
            let data = JSON.stringify({
              kode_pelanggan: parentValue,
              kode_transaksi: transaksi[i]._id,
              jenis_transaksi: 'Pengembalian'
            })
            let temp = axios.post(url, data, {headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.X_API_KEY
            }})
            axiosPostList.push(temp)
          }
          try {
            let resultOfAxiosPost = await Promise.all(axiosPostList)
            for (var i = 0; i < resultOfAxiosPost.length; i++) {
              transaksi[i].saldo_akhir = resultOfAxiosPost[i].data[0] ? resultOfAxiosPost[i].data[0].saldo_akhir : 0
            }
          } catch (e) {
            console.log(e)
          }
          return transaksi
        },
        description: 'List transaksi yg dikembalikan'
      },
    }
  }
})
