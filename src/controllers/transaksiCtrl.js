const TransaksiModel  = require('../models/transaksiModel')
const Sekolah         = require('../models').Sekolah

class TransaksiController {
  static async readTransaksi (req, res, next) {
    try {
      let level_user = req.tokenContent.level_user
      let kode_sekolah = req.tokenContent.kode_sekolah
      let TransaksiDatas = await TransaksiModel.find().populate('kode_pelanggan transaksi_detail.kode_menu')
      let filterTransaksiDatasByAdminAccess = []
      if (level_user === 0) {
        filterTransaksiDatasByAdminAccess = TransaksiDatas
      } else {
        filterTransaksiDatasByAdminAccess = TransaksiDatas.filter((transaksi) => {
          try {
            if (kode_sekolah.indexOf(transaksi.kode_pelanggan.kode_sekolah) > -1) {
              return transaksi
            }
          } catch (e) {

          }
        })
      }
      let TransaksiDatasWithSekolah = await Sekolah.populate(filterTransaksiDatasByAdminAccess, 'kode_pelanggan.kode_sekolah')
      res.status(200).send({
        data: TransaksiDatasWithSekolah,
        message: 'Request Success',
        status: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'There\'s some error in the server',
        process: 'readTransaksi',
        status: 'Request Failed'
      })
    }
  }
}

module.exports = TransaksiController
