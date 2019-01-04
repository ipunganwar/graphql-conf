const graphql           = require('graphql')
const GraphQLString     = graphql.GraphQLString
const GraphQLNonNull    = graphql.GraphQLNonNull
const daftarPesananType   = require('../../types/daftarPesananType')
const verifyTokenOutlet = require('../../../helpers/verifyTokenOutlet')
const TransaksiModel    = require('../../../models').Transaksi

const daftarPesananData = {
  type: daftarPesananType,
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

    let tempRekapIstirahat1 = {
      jumlahMakanan: 0,
      jumlahMinuman: 0,
      jumlahSnack: 0,
      rekapPesanan: []
    }

    let tempRekapIstirahat2 = {
      jumlahMakanan: 0,
      jumlahMinuman: 0,
      jumlahSnack: 0,
      rekapPesanan: []
    }

    let tempRekapIstirahat3 = {
      jumlahMakanan: 0,
      jumlahMinuman: 0,
      jumlahSnack: 0,
      rekapPesanan: []
    }

    let tempIdPesananIstirahat1 = []
    let tempIdPesananIstirahat2 = []
    let tempIdPesananIstirahat3 = []

    if(kode_outlet) {
      try {
        const tempTransactionData = await TransaksiModel.find({
          'kode_outlet': kode_outlet,
          'tanggal_ambil': {"$gte": tempYesterday, "$lt": tempTomorrow}
        })
        .populate('transaksi_detail.kode_menu')
        .populate('kode_pelanggan')        
        
        if(tempTransactionData.length > 0) {
          tempTransactionData.forEach((itemTransaksi, index) => {
            if(itemTransaksi.jenis_transaksi === 0) {
              itemTransaksi.transaksi_detail.forEach((itemDetail, index) => {
                if(itemDetail.jam_istirahat === 1) {
                  
                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapIstirahat1.jumlahMakanan += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapIstirahat1.jumlahMinuman += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapIstirahat1.jumlahSnack += itemDetail.jumlah_pesan
                  }

                  if(tempIdPesananIstirahat1.length === 0) {
                    tempIdPesananIstirahat1.push(itemDetail.kode_menu._id)

                    let tempJenisMenu;

                    if(itemDetail.kode_menu.jenis_menu === 1) {
                      tempJenisMenu = 'makanan'
                    } else
                      if(itemDetail.kode_menu.jenis_menu === 2) {
                        tempJenisMenu = 'minuman'
                      } else {
                        tempJenisMenu = 'snack'
                      }
                    
                    tempRekapIstirahat1.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))

                  } else {
                    tempIdPesananIstirahat1.forEach((itemId, index) => {
                      let statusPenambahanPesanan = false
                      if(itemDetail.kode_menu._id === itemId) {
                        
                        statusPenambahanPesanan = true
                        tempRekapIstirahat1.rekapPesanan.forEach(itemRekap => {
                          if(itemRekap.id === itemDetail.kode_menu._id) {
                            let tempStatus = true

                            if(itemDetail.jumlah_ambil) {
                              tempStatus = true
                            } else {
                              tempStatus = false
                            }
                            itemRekap.qty += 1
                            itemRekap.pemesan.push({
                              nama: itemTransaksi.kode_pelanggan.nama_pelanggan,
                              nisn: itemTransaksi.kode_pelanggan.username,
                              status: tempStatus
                            })
                          }
                        })
                      }

                      if(index === tempIdPesananIstirahat1.length -1 && statusPenambahanPesanan === false) {

                        let tempJenisMenu;

                        if(itemDetail.kode_menu.jenis_menu === 1) {
                          tempJenisMenu = 'makanan'
                        } else
                          if(itemDetail.kode_menu.jenis_menu === 2) {
                            tempJenisMenu = 'minuman'
                          } else {
                            tempJenisMenu = 'snack'
                          }                      

                        tempRekapIstirahat1.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))
                      }
                    })
                  }
                }

                if(itemDetail.jam_istirahat === 2) {
                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapIstirahat2.jumlahMakanan += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapIstirahat2.jumlahMinuman += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapIstirahat2.jumlahSnack += itemDetail.jumlah_pesan
                  }

                  if(tempIdPesananIstirahat2.length === 0) {
                    tempIdPesananIstirahat2.push(itemDetail.kode_menu._id)

                    let tempJenisMenu;

                    if(itemDetail.kode_menu.jenis_menu === 1) {
                      tempJenisMenu = 'makanan'
                    } else
                      if(itemDetail.kode_menu.jenis_menu === 2) {
                        tempJenisMenu = 'minuman'
                      } else {
                        tempJenisMenu = 'snack'
                      }

                    tempRekapIstirahat2.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))
                  } else {
                    tempIdPesananIstirahat2.forEach((itemId, index) => {
                      let statusPenambahanPesanan = false
                      if(itemDetail.kode_menu._id === itemId) {
                        statusPenambahanPesanan = true
                        tempRekapIstirahat2.rekapPesanan.forEach(itemRekap => {
                          if(itemRekap.id === itemDetail.kode_menu._id) {
                            let tempStatus = true

                            if(itemDetail.jumlah_ambil) {
                              tempStatus = true
                            } else {
                              tempStatus = false
                            }
                            itemRekap.qty += 1
                            itemRekap.pemesan.push({
                              nama: itemTransaksi.kode_pelanggan.nama_pelanggan,
                              nisn: itemTransaksi.kode_pelanggan.username,
                              status: tempStatus
                            })
                          }
                        })
                      }

                      if(index === tempIdPesananIstirahat2.length -1 && statusPenambahanPesanan === false) {
                        tempIdPesananIstirahat2.push(itemDetail.kode_menu._id)

                        let tempJenisMenu;

                        if(itemDetail.kode_menu.jenis_menu === 1) {
                          tempJenisMenu = 'makanan'
                        } else
                          if(itemDetail.kode_menu.jenis_menu === 2) {
                            tempJenisMenu = 'minuman'
                          } else {
                            tempJenisMenu = 'snack'
                          }

                        tempRekapIstirahat2.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))
                      }
                    })
                  }
                }

                if(itemDetail.jam_istirahat === 3) {
                  if(itemDetail.kode_menu.jenis_menu === 1) {
                    tempRekapIstirahat3.jumlahMakanan += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 2) {
                    tempRekapIstirahat3.jumlahMinuman += itemDetail.jumlah_pesan
                  }

                  if(itemDetail.kode_menu.jenis_menu === 3) {
                    tempRekapIstirahat3.jumlahSnack += itemDetail.jumlah_pesan
                  }

                  if(tempIdPesananIstirahat3.length === 0) {
                    tempIdPesananIstirahat3.push(itemDetail.kode_menu._id)

                    let tempJenisMenu;

                    if(itemDetail.kode_menu.jenis_menu === 1) {
                      tempJenisMenu = 'makanan'
                    } else
                      if(itemDetail.kode_menu.jenis_menu === 2) {
                        tempJenisMenu = 'minuman'
                      } else {
                        tempJenisMenu = 'snack'
                      }

                    tempRekapIstirahat3.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))
                  } else {
                    tempIdPesananIstirahat3.forEach((itemId, index) => {
                      let statusPenambahanPesanan = false
                      if(itemDetail.kode_menu._id === itemId) {
                        statusPenambahanPesanan = true
                        tempRekapIstirahat3.rekapPesanan.forEach(itemRekap => {
                          if(itemRekap.id === itemDetail.kode_menu._id) {
                            let tempStatus = true

                            if(itemDetail.jumlah_ambil) {
                              tempStatus = true
                            } else {
                              tempStatus = false
                            }
                            itemRekap.qty += 1
                            itemRekap.pemesan.push({
                              nama: itemTransaksi.kode_pelanggan.nama_pelanggan,
                              nisn: itemTransaksi.kode_pelanggan.username,
                              status: tempStatus
                            })
                          }
                        })
                      }

                      if(index === tempIdPesananIstirahat3.length -1 && statusPenambahanPesanan === false) {
                        tempIdPesananIstirahat3.push(itemDetail.kode_menu._id)

                        let tempJenisMenu;

                        if(itemDetail.kode_menu.jenis_menu === 1) {
                          tempJenisMenu = 'makanan'
                        } else
                          if(itemDetail.kode_menu.jenis_menu === 2) {
                            tempJenisMenu = 'minuman'
                          } else {
                            tempJenisMenu = 'snack'
                          }

                        tempRekapIstirahat3.rekapPesanan.push(initRekapPesanan(itemDetail, itemTransaksi, tempJenisMenu))
                      }
                    })
                  }
                }
              })
            }
          })

          return {
            tanggalTransaksi: args.tanggalTransaksi,
            istirahat1: tempRekapIstirahat1,
            istirahat2: tempRekapIstirahat2,
            istirahat3: tempRekapIstirahat3
          }
        }
          return null
      } catch (e) {
        throw new Error(e)
      }
    }
      return kode_outlet
  }
}

const initRekapPesanan = (itemDetail, itemTransaksi, tempJenisMenu) => {
  
  let tempStatusPesanan = true

  if(itemDetail.jumlah_ambil) {
    tempStatusPesanan = true
  } else {
    tempStatusPesanan = false
  }

  return {
    id: itemDetail.kode_menu._id,
    name: itemDetail.kode_menu.nama_menu,
    category: tempJenisMenu,
    qty: itemDetail.jumlah_pesan  ,
    photo: itemDetail.kode_menu.foto_menu,
    pemesan: [{
      nama: itemTransaksi.kode_pelanggan.nama_pelanggan,
      nisn: itemTransaksi.kode_pelanggan.username,
      status: tempStatusPesanan
    }]
  }
}

module.exports = daftarPesananData
