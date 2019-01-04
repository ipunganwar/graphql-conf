const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const GraphQLNonNull    = graphql.GraphQLNonNull
const berandaDataType   = require('../../types/berandaDataType')
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const TransaksiModel    = require('../../../models').Transaksi

const berandaData = {
  type: berandaDataType,
  args: {
    userToken: {type: GraphQLString},
    tanggalTransaksi: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async function(parentValue, args) {
    let tempTanggalTransaksi = new Date(args.tanggalTransaksi)
    let tempTomorrow = new Date(tempTanggalTransaksi)
    let tempYesterday = new Date(tempTanggalTransaksi)
    tempTomorrow.setDate(tempTomorrow.getDate() + 1)
    const kode_outlet = verifyTokenOutlet(args.userToken)

    if(kode_outlet) {
      const tempTransactionData = await TransaksiModel.find({
        'kode_outlet': kode_outlet,
        'tanggal_ambil': {"$gte": tempYesterday, "$lt": tempTomorrow}
      })
      .populate('transaksi_detail.kode_menu')
      .populate('kode_pelanggan')

      let tempBalanceData = {
        semua: {
          transaksiAplikasi: 0,
          transaksiKasir: 0
        },
        istirahat1: {
          transaksiAplikasi: 0,
          transaksiKasir: 0
        },
        istirahat2: {
          transaksiAplikasi: 0,
          transaksiKasir: 0
        },
        istirahat3: {
          transaksiAplikasi: 0,
          transaksiKasir: 0
        }
      }

      let tempPurchasingData = {
        semua: {
          menuDibeli: 0,
          pembeli: 0,
          belumDiambil: 0
        },
        istirahat1: {
          menuDibeli: 0,
          pembeli: 0,
          belumDiambil: 0
        },
        istirahat2: {
          menuDibeli: 0,
          pembeli: 0,
          belumDiambil: 0
        },
        istirahat3: {
          menuDibeli: 0,
          pembeli: 0,
          belumDiambil: 0
        }
      }

      let tempOrderStatus = {
        semua: {
          makanan: 0,
          minuman: 0,
          snack: 0
        },
        istirahat1: {
          makanan: 0,
          minuman: 0,
          snack: 0
        },
        istirahat2: {
          makanan: 0,
          minuman: 0,
          snack: 0
        },
        istirahat3: {
          makanan: 0,
          minuman: 0,
          snack: 0
        }
      }

      if(tempTransactionData.length > 0) {
        tempTransactionData.forEach(item => {
          let idTransaksi1, idTransaksi2, idTransaksi3;
          item.transaksi_detail.forEach(itemDetail => {
            if(itemDetail.jam_ambil) {
              if(itemDetail.jam_istirahat === 1) {
                if(item.jenis_transaksi === 0) {
                  tempBalanceData.istirahat1.transaksiAplikasi += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                if(item.jenis_transaksi === 1) {
                  tempBalanceData.istirahat1.transaksiKasir += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                tempPurchasingData.istirahat1.menuDibeli += itemDetail.jumlah_ambil
                tempPurchasingData.istirahat1.belumDiambil += (itemDetail.jumlah_pesan - itemDetail.jumlah_ambil - itemDetail.jumlah_kembali)

                if(item._id != idTransaksi1) {
                  tempPurchasingData.istirahat1.pembeli+=1
                }
                idTransaksi1 = item._id
              }

              if(itemDetail.jam_istirahat === 2) {
                if(item.jenis_transaksi === 0) {
                  tempBalanceData.istirahat2.transaksiAplikasi += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                if(item.jenis_transaksi === 1) {
                  tempBalanceData.istirahat2.transaksiKasir += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                tempPurchasingData.istirahat2.menuDibeli += itemDetail.jumlah_ambil
                tempPurchasingData.istirahat2.belumDiambil += (itemDetail.jumlah_pesan - itemDetail.jumlah_ambil - itemDetail.jumlah_kembali)

                if(item._id != idTransaksi2) {
                  tempPurchasingData.istirahat2.pembeli+=1
                }
                idTransaksi2 = item._id
              }

              if(itemDetail.jam_istirahat === 3) {
                if(item.jenis_transaksi === 0) {
                  tempBalanceData.istirahat3.transaksiAplikasi += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                if(item.jenis_transaksi === 1) {
                  tempBalanceData.istirahat3.transaksiKasir += (itemDetail.jumlah_ambil * itemDetail.harga_beli)
                }

                tempPurchasingData.istirahat3.menuDibeli += itemDetail.jumlah_ambil
                tempPurchasingData.istirahat3.belumDiambil += (itemDetail.jumlah_pesan - itemDetail.jumlah_ambil - itemDetail.jumlah_kembali)

                if(item._id != idTransaksi3) {
                  tempPurchasingData.istirahat2.pembeli+=1
                }
                idTransaksi3 = item._id
              }
            }

            if(itemDetail.jam_istirahat === 1) {
              if(itemDetail.kode_menu.jenis_menu === 1) {
                tempOrderStatus.istirahat1.makanan += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 2) {
                tempOrderStatus.istirahat1.minuman += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 3) {
                tempOrderStatus.istirahat1.snack += itemDetail.jumlah_pesan
              }
            }

            if(itemDetail.jam_istirahat === 2) {
              if(itemDetail.kode_menu.jenis_menu === 1) {
                tempOrderStatus.istirahat2.makanan += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 2) {
                tempOrderStatus.istirahat2.minuman += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 3) {
                tempOrderStatus.istirahat2.snack += itemDetail.jumlah_pesan
              }
            }

            if(itemDetail.jam_istirahat === 3) {
              if(itemDetail.kode_menu.jenis_menu === 1) {
                tempOrderStatus.istirahat3.makanan += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 2) {
                tempOrderStatus.istirahat3.minuman += itemDetail.jumlah_pesan
              }

              if(itemDetail.kode_menu.jenis_menu === 3) {
                tempOrderStatus.istirahat3.snack += itemDetail.jumlah_pesan
              }
            }


          })
        })

        tempBalanceData.semua.transaksiAplikasi += (tempBalanceData.istirahat1.transaksiAplikasi + tempBalanceData.istirahat2.transaksiAplikasi + tempBalanceData.istirahat3.transaksiAplikasi)
        tempBalanceData.semua.transaksiKasir += (tempBalanceData.istirahat1.transaksiKasir + tempBalanceData.istirahat2.transaksiKasir + tempBalanceData.istirahat3.transaksiKasir)
        tempPurchasingData.semua.menuDibeli += (tempPurchasingData.istirahat1.menuDibeli + tempPurchasingData.istirahat2.menuDibeli + tempPurchasingData.istirahat3.menuDibeli)
        tempPurchasingData.semua.pembeli += (tempPurchasingData.istirahat1.pembeli + tempPurchasingData.istirahat2.pembeli + tempPurchasingData.istirahat3.pembeli)
        tempPurchasingData.semua.belumDiambil += (tempPurchasingData.istirahat1.belumDiambil + tempPurchasingData.istirahat2.belumDiambil + tempPurchasingData.istirahat3.belumDiambil)
        tempOrderStatus.semua.makanan += (tempOrderStatus.istirahat1.makanan + tempOrderStatus.istirahat2.makanan + tempOrderStatus.istirahat3.makanan)
        tempOrderStatus.semua.minuman += (tempOrderStatus.istirahat1.minuman + tempOrderStatus.istirahat2.minuman + tempOrderStatus.istirahat3.minuman)
        tempOrderStatus.semua.snack += (tempOrderStatus.istirahat1.snack + tempOrderStatus.istirahat2.snack + tempOrderStatus.istirahat3.snack)

        return {
          tanggalTransaksi: args.tanggalTransaksi,
          rincianTransaksi: tempBalanceData,
          rincianPembelian: tempPurchasingData,
          statusPesanan: tempOrderStatus
        }

      } else {
        return null
      }
    }
    return kode_outlet
  }
}

module.exports = berandaData
