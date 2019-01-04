const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLID         = graphql.GraphQLID
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLString     = graphql.GraphQLString
const transaksiType     = require('../../types/transaksiTabletType').transaksiType
const transaksiModel    = require('../../../models/transaksiModel')
const pelangganModel    = require('../../../models/pelangganModel')
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
var moment = require('moment-timezone');
moment.locale('id')

const getDataTransaksiByIdPelangganandTanggalAmbil = {
  type: new GraphQLList(transaksiType),
  args: {
    userToken: {type: GraphQLString},
    idPelanggan: {type: new GraphQLNonNull(GraphQLID)},
    tanggalAmbil: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.userToken)
    let tempTanggalAmbil = moment.utc(args.tanggalAmbil).tz('Asia/Jakarta').format()
    let tempTomorrow = moment.utc(args.tanggalAmbil)
    tempTomorrow.add(1, 'days')
    tempTomorrow = moment.utc(tempTomorrow).tz('Asia/Jakarta').startOf('day').format()
    let tempYesterday = moment.utc(args.tanggalAmbil).tz('Asia/Jakarta').startOf('day').format()

    if(kode_outlet) {
      try {
        const transaksi = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'kode_pelanggan': args.idPelanggan,
          'jenis_transaksi': 0,
          'tanggal_ambil': {"$gte": tempYesterday, "$lt": tempTomorrow}
        }).populate('transaksi_detail.kode_menu').populate({path: 'kode_pelanggan', populate: {path: 'kode_sekolah'}}).populate({path: 'kode_outlet', populate: {path: 'kode_sekolah'}}).populate('kode_outlet')

        const transaksiKasir = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'kode_pelanggan': args.idPelanggan,
          'jenis_transaksi': 1,
          'tanggal_ambil': {"$gte": tempYesterday, "$lt": tempTomorrow}
        }).populate('transaksi_detail.kode_menu').populate({path: 'kode_pelanggan', populate: {path: 'kode_sekolah'}}).populate({path: 'kode_outlet', populate: {path: 'kode_sekolah'}})

        let newTransaksiAplikasi = []
        let newTransaksiKasir = []
        let detailTransaksi = {}
        let tempTransaksiAplikasi = []
        let tempTransaksiKasir = []
        if(transaksi.length > 0) {
          newTransaksiAplikasi = transaksiDivider(transaksi)

          let detailTransaksi = {
            istirahat1: [],
            istirahat2: [],
            istirahat3: []
          }

          if(newTransaksiAplikasi[0].transaksi_detail.length > 0) {

            tempTransaksiAplikasi = JSON.parse(JSON.stringify(newTransaksiAplikasi[0]))
            tempTransaksiAplikasi.transaksi_detail.forEach(itemDetail => {
              if(itemDetail.jam_istirahat === 1) {
                detailTransaksi.istirahat1.push(itemDetail)
              }

              if(itemDetail.jam_istirahat === 2) {
                detailTransaksi.istirahat2.push(itemDetail)
              }

              if(itemDetail.jam_istirahat === 3) {
                detailTransaksi.istirahat3.push(itemDetail)
              }
            })
          } else {

            tempTransaksiAplikasi = JSON.parse(JSON.stringify(newTransaksiAplikasi[0]))
          }

          tempTransaksiAplikasi.transaksi_detail = detailTransaksi
          tempTransaksiAplikasi = [tempTransaksiAplikasi]
        } else {
          let tempDataPelanggan = await pelangganModel.findById(args.idPelanggan).populate('kode_sekolah')

          let newReturn = [{
            _id: 'idkosong',
            jenis_transaksi: 0,
            kode_pelanggan: {
              _id: tempDataPelanggan.id,
              kode_sekolah: tempDataPelanggan.kode_sekolah,
              kode_pelanggan: tempDataPelanggan.id,
              kelas: tempDataPelanggan.kelas,
              username: tempDataPelanggan.username,
              password: tempDataPelanggan.password,
              foto_pelanggan: tempDataPelanggan.foto_pelanggan,
              nama_pelanggan: tempDataPelanggan.nama_pelanggan,
              peran: tempDataPelanggan.peran,
              saldo: tempDataPelanggan.saldo,
              notifikasi: tempDataPelanggan.notifikasi,
              email: tempDataPelanggan.email,
              alamat: tempDataPelanggan.alamat
            },
            tanggal_ambil: tempTanggalAmbil,
            transaksi_detail: {
              istirahat1: [],
              istirahat2: [],
              istirahat3: []
            }
          }]

          tempTransaksiAplikasi = newReturn
        }

        if(transaksiKasir.length > 0) {
          newTransaksiKasir = transaksiDivider(transaksiKasir)

          let detailTransaksi = {
            istirahat1: [],
            istirahat2: [],
            istirahat3: []
          }

          tempTransaksiKasir = JSON.parse(JSON.stringify(newTransaksiKasir[0]))
          if(newTransaksiKasir[0].transaksi_detail.length > 0) {

            tempTransaksiKasir.transaksi_detail.forEach(itemDetail => {

              if(itemDetail.jam_istirahat === 1) {
                detailTransaksi.istirahat1.push(itemDetail)
              }

              if(itemDetail.jam_istirahat === 2) {
                detailTransaksi.istirahat2.push(itemDetail)
              }

              if(itemDetail.jam_istirahat === 3) {
                detailTransaksi.istirahat3.push(itemDetail)
              }
            })
          }

          tempTransaksiKasir.transaksi_detail = detailTransaksi
          tempTransaksiKasir = [tempTransaksiKasir]
        } else {
          let tempDataPelanggan = await pelangganModel.findById(args.idPelanggan).populate('kode_sekolah')

          let newReturn = [{
            _id: 'idkosong',
            jenis_transaksi: 1,
            kode_pelanggan: {
              _id: tempDataPelanggan.id,
              kode_sekolah: tempDataPelanggan.kode_sekolah,
              kode_pelanggan: tempDataPelanggan.id,
              kelas: tempDataPelanggan.kelas,
              username: tempDataPelanggan.username,
              password: tempDataPelanggan.password,
              foto_pelanggan: tempDataPelanggan.foto_pelanggan,
              nama_pelanggan: tempDataPelanggan.nama_pelanggan,
              peran: tempDataPelanggan.peran,
              saldo: tempDataPelanggan.saldo,
              notifikasi: tempDataPelanggan.notifikasi,
              email: tempDataPelanggan.email,
              alamat: tempDataPelanggan.alamat
            },
            tanggal_ambil: tempTanggalAmbil,
            transaksi_detail: {
              istirahat1: [],
              istirahat2: [],
              istirahat3: []
            }
          }]

          tempTransaksiKasir = newReturn
        }

        let newResult = tempTransaksiAplikasi.concat(tempTransaksiKasir)

        if(newResult.length < 1) {

          let tempDataPelanggan = await pelangganModel.findById(args.idPelanggan).populate('kode_sekolah')

          let newReturn = [{
            _id: 'idkosong',
            kode_pelanggan: {
              _id: tempDataPelanggan._id,
              kode_sekolah: tempDataPelanggan.kode_sekolah,
              kode_pelanggan: tempDataPelanggan._id,
              kelas: tempDataPelanggan.kelas,
              username: tempDataPelanggan.username,
              password: tempDataPelanggan.password,
              foto_pelanggan: tempDataPelanggan.foto_pelanggan,
              nama_pelanggan: tempDataPelanggan.nama_pelanggan,
              peran: tempDataPelanggan.peran,
              saldo: tempDataPelanggan.saldo,
              notifikasi: tempDataPelanggan.notifikasi,
              email: tempDataPelanggan.email,
              alamat: tempDataPelanggan.alamat
            }
          }]

          return newReturn
        } else {
          return newResult
        }
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}

const transaksiDivider = (transaksiData) => {
  let transaksi = JSON.parse(JSON.stringify(transaksiData))
  let transaksiPisah = []
  let returnedTransaksi = []

  transaksi.forEach((items) => {
    items.transaksi_detail.map((item, index) => {
      item.kode_transaksi = items._id
      item.kode_outlet = items.kode_outlet.kode_outlet
    })
  })

  for (var i = 0; i < transaksi.length; i++) {
    let gabunganTanggalDanIdOutlet = new Date(transaksi[i].tanggal_ambil).getDate().toString() + new Date(transaksi[i].tanggal_ambil).getMonth().toString() + new Date(transaksi[i].tanggal_ambil).getYear().toString()
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

        let kodeMenuDanJamIstirahat = JSON.parse(JSON.stringify(returnedTransaksi[i].transaksi_detail[j].kode_menu._id)) + '#' + JSON.parse(JSON.stringify(returnedTransaksi[i].transaksi_detail[j].jam_istirahat))

        if (gabunganTransaksiDetailMenuYgAda.indexOf(kodeMenuDanJamIstirahat) > -1) {
          if(returnedTransaksi[i].transaksi_detail[j].jumlah_pesan - (returnedTransaksi[i].transaksi_detail[j].jumlah_ambil + returnedTransaksi[i].transaksi_detail[j].jumlah_kembali) > 0) {
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
}

module.exports = {
  getDataTransaksiByIdPelangganandTanggalAmbil
}
