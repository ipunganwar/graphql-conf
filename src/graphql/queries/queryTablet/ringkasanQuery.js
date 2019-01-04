const graphql                 = require('graphql')
const GraphQLObjectType       = graphql.GraphQLObjectType
const GraphQLList             = graphql.GraphQLList
const GraphQLID               = graphql.GraphQLID
const GraphQLNonNull          = graphql.GraphQLNonNull
const GraphQLString           = graphql.GraphQLString
const transaksiModel          = require('../../../models/transaksiModel')
const verifyTokenOutlet       = require('../../../helpers/verifyTokenOutlet')
const rekapTransaksiHari      = require('../../types/rekapTransaksiType/transaksiHariType').rekapTransaksiHariType
const rekapTransaksiPerPeriod = require('../../types/rekapTransaksiType/transaksiPerPeriod').rekapTransaksiPerPeriodType

const findRekapTransaksiByOutlet = {
  type: rekapTransaksiHari,
  args: {
    token: {type: GraphQLString},
    tanggalTransaksi: {type: GraphQLString}
  },
  resolve: async (parentValue, args) => {
    console.log('harian guys');
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        let tempRekapData = {
          hari: {
            transaksiAplikasi: 0,
            transaksiKasir: 0,
            makanan: 0,
            minuman: 0,
            snack: 0,
            kasir: 0
          },
          istirahat1: {
            transaksiAplikasi: 0,
            transaksiKasir: 0,
            makanan: 0,
            minuman: 0,
            snack: 0,
            kasir: 0
          },
          istirahat2: {
            transaksiAplikasi: 0,
            transaksiKasir: 0,
            makanan: 0,
            minuman: 0,
            snack: 0,
            kasir: 0
          },
          istirahat3: {
            transaksiAplikasi: 0,
            transaksiKasir: 0,
            makanan: 0,
            minuman: 0,
            snack: 0,
            kasir: 0
          }
        }
        let tempTanggal = new Date(args.tanggalTransaksi)
        let startDate = new Date(tempTanggal)
        let endDate = new Date(tempTanggal)
        endDate.setDate(endDate.getDate() + 1)
        let dataTransaksi = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'tanggal_ambil': {"$gte": startDate, "$lt": endDate}
        })
        .populate('transaksi_detail.kode_menu')

        dataTransaksi.forEach(item => {
          item.transaksi_detail.forEach(itemDetail => {
            if(itemDetail.jam_ambil != null) {
              if(itemDetail.jam_istirahat === 1) {
                if(item.jenis_transaksi === 0) {
                  tempRekapData.istirahat1.transaksiAplikasi += itemDetail.harga_beli * itemDetail.jumlah_ambil
                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapData.istirahat1.makanan += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapData.istirahat1.minuman += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapData.istirahat1.snack += 1
                  }
                }

                if(item.jenis_transaksi === 1) {
                  tempRekapData.istirahat1.transaksiKasir += itemDetail.harga_beli * itemDetail.jumlah_ambil
                  tempRekapData.istirahat1.kasir += 1
                }
              }

              if(itemDetail.jam_istirahat === 2) {
                if(item.jenis_transaksi === 0) {
                  tempRekapData.istirahat2.transaksiAplikasi += itemDetail.harga_beli * itemDetail.jumlah_ambil

                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapData.istirahat2.makanan += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapData.istirahat2.minuman += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapData.istirahat2.snack += 1
                  }
                }

                if(item.jenis_transaksi === 1) {
                  tempRekapData.istirahat2.transaksiKasir += itemDetail.harga_beli * itemDetail.jumlah_ambil
                  tempRekapData.istirahat3.kasir += 1
                }
              }

              if(itemDetail.jam_istirahat === 3) {
                if(item.jenis_transaksi === 0) {
                  tempRekapData.istirahat3.transaksiAplikasi += itemDetail.harga_beli * itemDetail.jumlah_ambil

                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapData.istirahat3.makanan += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapData.istirahat3.minuman += 1
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapData.istirahat3.snack += 1
                  }
                }

                if(item.jenis_transaksi === 1) {
                  tempRekapData.istirahat3.transaksiKasir += itemDetail.harga_beli * itemDetail.jumlah_ambil
                  tempRekapData.istirahat3.kasir += 1
                }
              }
            }
          })
        })
        tempRekapData.hari.transaksiKasir = tempRekapData.istirahat1.transaksiKasir + tempRekapData.istirahat2.transaksiKasir + tempRekapData.istirahat3.transaksiKasir
        tempRekapData.hari.transaksiAplikasi = tempRekapData.istirahat1.transaksiAplikasi + tempRekapData.istirahat2.transaksiAplikasi + tempRekapData.istirahat3.transaksiAplikasi
        tempRekapData.hari.makanan = tempRekapData.istirahat1.makanan + tempRekapData.istirahat2.makanan + tempRekapData.istirahat3.makanan
        tempRekapData.hari.minuman = tempRekapData.istirahat1.minuman + tempRekapData.istirahat2.minuman + tempRekapData.istirahat3.minuman
        tempRekapData.hari.snack = tempRekapData.istirahat1.snack + tempRekapData.istirahat2.snack + tempRekapData.istirahat3.snack
        tempRekapData.hari.kasir = tempRekapData.istirahat1.kasir + tempRekapData.istirahat2.kasir + tempRekapData.istirahat3.kasir
        console.log('di backend', dataTransaksi)
        console.log('data rekap', tempRekapData);
        return tempRekapData
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

const findRekapTransaksiOutletPerPeriod = {
  type: rekapTransaksiPerPeriod,
  args: {
    token: {type: GraphQLString},
    periodType: {type: GraphQLString},
    tanggalTransaksi: {type: GraphQLString}
  },
  resolve: async (parentValue, args) => {
    const kode_outlet = verifyTokenOutlet(args.token)
    if(kode_outlet) {
      try {
        let startDate, endDate;
        let tempDataTransaksi = {
          transaksiAplikasi: 0,
          transaksiKasir: 0,
          makanan: 0,
          minuman: 0,
          snack: 0,
          kasir: 0
        }

        if(args.periodType === 'week') {
          let tempTanggal = new Date(args.tanggalTransaksi)
          let tempDate = tempTanggal.getDay()
          let diff = tempTanggal.getDate() - tempDate + (tempDate == 0 ? -6:1)
          startDate = new Date(tempTanggal.setDate(diff))
          endDate = new Date(startDate)
          endDate.setDate(endDate.getDate() + 6)
        }

        if(args.periodType === 'month') {
          let tempTanggal = new Date(args.tanggalTransaksi)
          startDate = new Date(args.tanggalTransaksi)
          startDate.setDate(1)
          endDate = new Date(tempTanggal.getFullYear(), startDate.getMonth() + 1, 1)
        }

        let dataTransaksi = await transaksiModel.find({
          'kode_outlet': kode_outlet,
          'tanggal_ambil': {"$gte": startDate, "$lt": endDate}
        })
        .populate('transaksi_detail.kode_menu')

        dataTransaksi.forEach(item => {
          item.transaksi_detail.forEach(itemDetail => {
            if(itemDetail.jam_ambil != null) {
              if(item.jenis_transaksi === 0) {
                tempDataTransaksi.transaksiAplikasi += itemDetail.harga_beli * itemDetail.jumlah_ambil

                if(itemDetail.kode_menu.jenis_menu === 1) {
                  tempDataTransaksi.makanan += 1
                }

                if(itemDetail.kode_menu.jenis_menu === 2) {
                  tempDataTransaksi.minuman += 1
                }

                if(itemDetail.kode_menu.jenis_menu === 3) {
                  tempDataTransaksi.snack += 1
                }
              }

              if(item.jenis_transaksi === 1) {
                tempDataTransaksi.transaksiKasir += itemDetail.harga_beli * itemDetail.jumlah_ambil
                tempDataTransaksi.kasir += 1
              }
            }
          })
        })
        console.log('nih data mingguan', tempDataTransaksi)

        return tempDataTransaksi
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

module.exports = {
  findRekapTransaksiByOutlet,
  findRekapTransaksiOutletPerPeriod
}
