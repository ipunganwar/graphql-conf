var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
const pelangganType = require('./pelangganType').pelangganType

// User Type
exports.topupType = new GraphQLObjectType({
  name: 'topup',
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
        description: 'Id dari mongodb'
      },
      kode_pelanggan: {
        type: pelangganType,
        description: 'Kode pelanggan yg melakukan transaksi'
      },
      tanggal_waktu: {
        type: GraphQLString,
        description: 'Tanggal dan waktu topup'
      },
      bank_asal: {
        type: GraphQLString,
        description: 'Bank Asal transfer(bank pelanggan)'
      },
      bank_tujuan: {
        type: GraphQLString,
        description: 'Bank Tujuan transfer(bank sekolah)'
      },
      nama_pengirim: {
        type: GraphQLString,
        description: 'Atas nama Bank Asal(bank pelanggan)'
      },
      saldo_topup: {
        type: GraphQLString,
        description: 'Saldo Topup'
      },
      status: {
        type: GraphQLString,
        description: 'Status'
      },
      saldo_akhir: {
        type: GraphQLInt,
        description: 'Saldo setelah melakukan topup'
      }
    }
  }
});
