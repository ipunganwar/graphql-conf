var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
const menuType = require('./menuType').menuType
const outletType = require('./outletType').outletType

// User Type
exports.jadwalMenuType = new GraphQLObjectType({
  name: 'jadwalMenu',
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
        description: 'Id dari mongo'
      },
      kode_outlet: {
        type: outletType,
        description: 'Outlet yang terdaftar'
      },
      kode_menu: {
        type: menuType,
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
});
