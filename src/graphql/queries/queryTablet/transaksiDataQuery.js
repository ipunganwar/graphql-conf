const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const GraphQLNonNull    = graphql.GraphQLNonNull
const transaksiDataType = require('../../types/rekapTransaksiType')
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const TransaksiModel    = require('../../../models').Transaksi
const PencairanModel    = require('../../../models/pencairanModel')
const axios             = require('axios')

const transaksiData = {
  type: transaksiDataType,
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
      // .populate({path: 'transaksi_detail', populate: {path: 'kode_menu'}})
      .populate('kode_pelanggan')
      .populate('kode_outlet')
      .populate('kode_sekolah')

      const tempPencairanData = await PencairanModel.find().populate('kode_outlet')

      let tempSaldoAwal = await axios.get(`${process.env.WALLET_API}?methods=mutasiHarian&tanggal=${args.tanggalTransaksi}&kode_user=${kode_outlet}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.X_API_KEY
        }
      })

      let tempMutasiTransaksi = mutasiTransaksiDivider(tempTransactionData)
      let tempRekapPengembalian = pengembalianDivider(tempMutasiTransaksi)
      let tempTransaksiKredit = saldoKreditDivider(tempMutasiTransaksi)
      let tempSaldoTunai = {}

      if(tempPencairanData.length === 0) {
        tempSaldoTunai = null
      } else {
        tempPencairanData.sort(function(a,b) {
          if(a.tanggal_pencairan > b.tanggal_pencairan) {
            return -1
          }

          if(a.tanggal_pencairan < b.tanggal_pencairan) {
            return 1
          }

          return 0
        })

        let returnPencairanData = tempPencairanData.find(function(item) {
          return (item.tanggal_pencairan >= tempYesterday && item.tanggal_pencairan <= tempTomorrow)
        })

        if(returnPencairanData === undefined) {
          tempSaldoTunai = null
        } else {
          tempSaldoTunai = {
            jumlahSaldo: returnPencairanData.saldo_tunai,
            tanggalTransfer: returnPencairanData.tanggal_pencairan
          }

          tempMutasiTransaksi.push({
            idTransaksi: returnPencairanData._id,
            jenisTransaksi: 'Pencairan',
            namaUser: 'Admin eKantin',
            tanggalTransaksi: returnPencairanData.tanggal_pencairan,
            jumlahSaldo: returnPencairanData.saldo_tunai,
            detailTransaksi: [{
              akunTujuan: returnPencairanData.kode_outlet.rekening.nama_bank + ' ' + returnPencairanData.kode_outlet.rekening.no_rekening,
              atasNama: returnPencairanData.kode_outlet.rekening.atas_nama,
              jenisTransaksi: 'Transfer'
            }]
          })
        }
      }

      let tempLaporanTransaksi = {
        saldoAwal: tempSaldoAwal.data.saldoAwal,
        saldoKredit: tempTransaksiKredit,
        pengembalian: tempRekapPengembalian,
        saldoTunai: tempSaldoTunai
      }

      let tempLaporanTransaksiOutlet = {
        tanggalTransaksi: args.tanggalTransaksi,
        laporanTransaksi: tempLaporanTransaksi,
        mutasiTransaksi: tempMutasiTransaksi
      }

      return tempLaporanTransaksiOutlet
    }

    return kode_outlet
  }
}

const mutasiTransaksiDivider = (tempTransactionData) => {
  let tempMutasiTransaksi = []
  let idxMutasiTransaksi = 0
  tempTransactionData.forEach(itemTransactionData => {

    tempMutasiTransaksi.push({
      idTransaksi: itemTransactionData._id,
      tanggalTransaksi: itemTransactionData.tanggal_ambil,
      jenisTransaksi: itemTransactionData.jenis_transaksi,
      namaUser: itemTransactionData.kode_pelanggan.nama_pelanggan,
      jumlahSaldo: 0,
      nisn: itemTransactionData.kode_pelanggan.username,
      peran: itemTransactionData.kode_pelanggan.peran,
      detailTransaksi: []
    })

    itemTransactionData.transaksi_detail.forEach((itemDetail, index) => {
      if(itemDetail.jumlah_ambil > 0) {

        tempMutasiTransaksi[idxMutasiTransaksi].detailTransaksi.push({
        jenisTransaksi: itemDetail.kode_menu.jenis_menu,
        urlGambarMenu: itemDetail.kode_menu.foto_menu,
        namaMenu: itemDetail.kode_menu.nama_menu,
        jumlahMenu: itemDetail.jumlah_ambil,
        hargaMenu: itemDetail.harga_beli,
        jam_istirahat: itemDetail.jam_istirahat,
        akunTujuan: null,
        atasNama: null,
        jenis_menu: itemDetail.kode_menu.jenis_menu
        })
      }

      if(itemDetail.jumlah_kembali > 0) {
        tempMutasiTransaksi[idxMutasiTransaksi].detailTransaksi.push({
          jenisTransaksi: 'pengembalian',
          urlGambarMenu: itemDetail.kode_menu.foto_menu,
          namaMenu: itemDetail.kode_menu.nama_menu,
          jumlahMenu: itemDetail.jumlah_kembali,
          hargaMenu: itemDetail.harga_beli,
          jam_istirahat: itemDetail.jam_istirahat,
          akunTujuan: null,
          atasNama: null,
          jenis_menu: itemDetail.kode_menu.jenis_menu
        })
      }

      if(index === itemTransactionData.transaksi_detail.length - 1 && tempMutasiTransaksi[idxMutasiTransaksi].detailTransaksi.length > 0) {
        idxMutasiTransaksi += 1
      } else
        if(index === itemTransactionData.transaksi_detail.length - 1 && tempMutasiTransaksi[idxMutasiTransaksi].detailTransaksi.length === 0) {
          idxMutasiTransaksi += 0
          tempMutasiTransaksi.splice(idxMutasiTransaksi, 1)
        }
    })
  })

  return tempMutasiTransaksi
}

const pengembalianDivider = (inputData) => {
  let tempRekapPengembalian = {
    istirahat1: [],
    istirahat2: [],
    istirahat3: []
  }

  inputData.forEach(itemTransaksi => {
    itemTransaksi.detailTransaksi.forEach(itemDetail => {
      if(itemDetail.jenisTransaksi === 'pengembalian') {
        if(itemDetail.jam_istirahat === 1) {
          if(tempRekapPengembalian.istirahat1.length === 0) {
            tempRekapPengembalian.istirahat1.push({
              namaPembeli: itemTransaksi.namaUser,
              saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            })
          } else {
            let findIdx = tempRekapPengembalian.istirahat1.findIndex(ele => ele.namaPembeli === itemTransaksi.namaUser)

            if(findIdx != -1) {
              tempRekapPengembalian.istirahat1[findIdx].saldoDikembalikan += (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            } else {
              tempRekapPengembalian.istirahat1.push({
                namaPembeli: itemTransaksi.namaUser,
                saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
              })
            }
          }
        }

        if(itemDetail.jam_istirahat === 2) {
          if(tempRekapPengembalian.istirahat2.length === 0) {
            tempRekapPengembalian.push({
              namaPembeli: itemTransaksi.namaUser,
              saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            })
          } else {
            let findIdx = tempRekapPengembalian.istirahat2.findIndex(ele => ele.namaPembeli === itemTransaksi.namaUser)

            if(findIdx) {
              tempRekapPengembalian.istirahat2[findIdx].saldoDikembalikan += (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            } else {
              tempRekapPengembalian.istirahat2.push({
                namaPembeli: itemTransaksi.namaUser,
                saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
              })
            }
          }
        }

        if(itemDetail.jam_istirahat === 3) {
          if(tempRekapPengembalian.istirahat3.length === 0) {
            tempRekapPengembalian.istirahat3.push({
              namaPembeli: itemTransaksi.namaUser,
              saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            })
          } else {
            let findIdx = tempRekapPengembalian.istirahat3.findIndex(ele => ele.namaPembeli === itemTransaksi.namaUser)

            if(findIdx) {
              tempRekapPengembalian.istirahat3[findIdx].saldoDikembalikan += (itemDetail.hargaMenu * itemDetail.jumlahMenu)
            } else {
              tempRekapPengembalian.istirahat3.push({
                namaPembeli: itemTransaksi.namaUser,
                saldoDikembalikan: (itemDetail.hargaMenu * itemDetail.jumlahMenu)
              })
            }
          }
        }
      }
    })
  })

  return tempRekapPengembalian
}

const saldoKreditDivider = (inputData) => {
  let tempTransaksiKredit = {
    istirahat1: {
      menuMakanan: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuMinuman: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuSnack: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      penjualanAplikasi: 0,
      penjualanKasir: {
        jumlahMenu: 0,
        totalSaldo: 0
      }
    },
    istirahat2: {
      menuMakanan: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuMinuman: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuSnack: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      penjualanAplikasi: 0,
      penjualanKasir: {
        jumlahMenu: 0,
        totalSaldo: 0
      }
    },
    istirahat3: {
      menuMakanan: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuMinuman: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      menuSnack: {
        jumlahMenu: 0,
        totalSaldo: 0
      },
      penjualanAplikasi: 0,
      penjualanKasir: {
        jumlahMenu: 0,
        totalSaldo: 0
      }
    }
  }

  inputData.forEach(itemTransactionData => {

      if(itemTransactionData.jenisTransaksi === 0) {
        itemTransactionData.detailTransaksi.forEach((itemDetail, index) => {

          if(itemDetail.jenisTransaksi != 'pengembalian') {
            if(itemDetail.jam_istirahat === 1) {
              if(itemDetail.jenis_menu === 1) {
                tempTransaksiKredit.istirahat1.menuMakanan.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat1.menuMakanan.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 2) {
                tempTransaksiKredit.istirahat1.menuMinuman.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat1.menuMinuman.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 3) {
                tempTransaksiKredit.istirahat1.menuSnack.jumlahMenu += itemDetail.jumlah_ambil
                tempTransaksiKredit.istirahat1.menuSnack.totalSaldo += (itemDetail.jumlah_ambil*itemDetail.harga_beli)
              }
            }

            if(itemDetail.jam_istirahat === 2) {
              if(itemDetail.jenis_menu === 1) {
                tempTransaksiKredit.istirahat2.menuMakanan.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat2.menuMakanan.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 2) {
                tempTransaksiKredit.istirahat2.menuMinuman.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat2.menuMinuman.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 3) {
                tempTransaksiKredit.istirahat2.menuSnack.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat2.menuSnack.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }
            }

            if(itemDetail.jam_istirahat === 3) {
              if(itemDetail.jenis_menu === 1) {
                tempTransaksiKredit.istirahat3.menuMakanan.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat3.menuMakanan.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 2) {
                tempTransaksiKredit.istirahat3.menuMinuman.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat3.menuMinuman.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }

              if(itemDetail.jenis_menu === 3) {
                tempTransaksiKredit.istirahat3.menuSnack.jumlahMenu += itemDetail.jumlahMenu
                tempTransaksiKredit.istirahat3.menuSnack.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
              }
            }
          }
        })
      }

      if(itemTransactionData.jenisTransaksi === 1) {
        itemTransactionData.detailTransaksi.forEach(itemDetail => {
          if(itemDetail.jam_istirahat === 1) {
            tempTransaksiKredit.istirahat1.penjualanKasir.jumlahMenu += itemDetail.jumlahMenu
            tempTransaksiKredit.istirahat1.penjualanKasir.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
          }

          if(itemDetail.jam_istirahat === 2) {
            tempTransaksiKredit.istirahat2.penjualanKasir.jumlahMenu += itemDetail.jumlahMenu
            tempTransaksiKredit.istirahat2.penjualanKasir.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
          }

          if(itemDetail.jam_istirahat === 3) {
            tempTransaksiKredit.istirahat3.penjualanKasir.jumlahMenu += itemDetail.jumlahMenu
            tempTransaksiKredit.istirahat3.penjualanKasir.totalSaldo += (itemDetail.jumlahMenu*itemDetail.hargaMenu)
          }
        })
      }

      tempTransaksiKredit.istirahat1.penjualanAplikasi = (tempTransaksiKredit.istirahat1.menuMakanan.totalSaldo + tempTransaksiKredit.istirahat1.menuMinuman.totalSaldo + tempTransaksiKredit.istirahat1.menuSnack.totalSaldo)
      tempTransaksiKredit.istirahat2.penjualanAplikasi = (tempTransaksiKredit.istirahat2.menuMakanan.totalSaldo + tempTransaksiKredit.istirahat2.menuMinuman.totalSaldo + tempTransaksiKredit.istirahat2.menuSnack.totalSaldo)
      tempTransaksiKredit.istirahat3.penjualanAplikasi = (tempTransaksiKredit.istirahat3.menuMakanan.totalSaldo + tempTransaksiKredit.istirahat3.menuMinuman.totalSaldo + tempTransaksiKredit.istirahat3.menuSnack.totalSaldo)
  })

  return tempTransaksiKredit
}

module.exports = transaksiData
