const graphql           = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLList       = graphql.GraphQLList
const GraphQLID         = graphql.GraphQLID
const GraphQLNonNull    = graphql.GraphQLNonNull
const GraphQLString     = graphql.GraphQLString
const transaksiType     = require('../types/transaksiTabletType').transaksiType
const transaksiModel    = require('../../models/transaksiModel')
const verifyTokenOutlet = require('../../helpers/verifyTokenOutlet')

const findAllTransaksi = {
  type: new GraphQLList(transaksiType),
  resolve: async () => {
    try {
      const allTransaksi = await transaksiModel.find().populate('kode_pelanggan').populate('kode_outlet')
      return allTransaksi
    } catch (e) {
      throw new Error(e)
    }
  }
}

const findPesananByOutlet = {
  type: new GraphQLList(transaksiType),
  args: {
    token: {type: GraphQLString},
    tanggalAmbil: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (parentValue, args) => {
    let tempTanggal = new Date(args.tanggalAmbil)
    let tommorow = new Date(tempTanggal)
    let yesterday = new Date(tempTanggal)
    let tempPesananData = []
    let returnedData = []
    tommorow.setDate(tommorow.getDate() + 1)
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        const pesanansData = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'tanggal_ambil': {"$gte": yesterday, "$lt": tommorow}
        }).populate('transaksi_detail.kode_menu')
        .populate('kode_pelanggan')
        .populate('kode_outlet')
        .populate({path: 'kode_outlet', populate: {path: 'kode_sekolah'}})
        
        pesanansData.forEach(itemTransaksi => {
          if(tempPesananData.length === 0) {
            tempPesananData.push([itemTransaksi])
          } else {
            tempPesananData.forEach((itemTempTransaksi, index) => {
              if(itemTempTransaksi[0].kode_pelanggan._id === itemTransaksi.kode_pelanggan._id) {
                itemTempTransaksi.push(itemTransaksi)
              } else 
              if(index === tempPesananData.length -1){
                tempPesananData.push([itemTransaksi])
              }
            })
          }
        })

        // console.log('noh', tempPesananData.length);
        
        tempPesananData.forEach(itemTempPesanan => {
          let newTransaksiData = transaksiDivider(itemTempPesanan) 
          returnedData.push(newTransaksiData[0])
        })
        
        // let dividedPesanansData = transaksiDivider(pesanansData)
        // let newPesananData = JSON.parse(JSON.stringify(dividedPesanansData))
        
        returnedData.forEach((itemPesanan, index) => {

          let detailTransaksi = {
            istirahat1: [],
            istirahat2: [],
            istirahat3: []
          }

          if(itemPesanan.transaksi_detail.length > 0) {
            
            let tempTransaksiAplikasi = itemPesanan
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
          }

          itemPesanan.transaksi_detail = detailTransaksi
        })        
        
        return returnedData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}

const findPesananByOutletAndUser = {
  type: new GraphQLList(transaksiType),
  args: {
    token: {type: GraphQLString},
    idPelanggan: {type: new GraphQLNonNull(GraphQLID)},
    tanggalAmbil: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        let tempTanggal = new Date(args.tanggalAmbil)
        const pesanansData = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'kode_pelanggan': 'args.idPelanggan',
          'tanggal_ambil': tempTanggal
        }).populate('transaksi_detail.kode_menu')
        return pesanansData
      } catch (e) {
        throw new Error(e)
      }
    }
    return kode_outlet
  }
}

const transaksiDivider = (transaksiData) => {
  // console.log('nuuuhh', transaksiData);
  
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
      // console.log(returnedTransaksi);
      
  return returnedTransaksi
}

module.exports = {
  findAllTransaksi,
  findPesananByOutlet,
  findPesananByOutletAndUser
}
