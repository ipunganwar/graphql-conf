var jwt = require('jsonwebtoken')
const UserDashboard = require('../models/').UserDashboard
const Sekolah = require('../models/').Sekolah
const Outlet = require('../models/').Outlet
const Menu = require('../models/').Menu
const Kantin = require('../models/').Kantin
const Pelanggan = require('../models/').Pelanggan
const Transaksi = require('../models/').Transaksi

class BerandaCtrl {
  static totalSaldoBeranda (req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (!req.query.tanggal) {
      res.status(400).send({
        message: 'Tanggal Params may not null'
      })
    }
    let tanggal00 = new Date(req.query.tanggal)
    let tanggalBesok = new Date(req.query.tanggal)
    tanggal00.setHours(0)
    tanggal00.setMinutes(0)
    tanggal00.setSeconds(0)
    tanggal00.setMilliseconds(0)
    tanggalBesok.setHours(23)
    tanggalBesok.setMinutes(59)
    tanggalBesok.setSeconds(59)
    tanggalBesok.setMilliseconds(999)
    if (level_user === 0) {
      Transaksi.find({tanggal_ambil: {$lte: tanggalBesok, $gte: tanggal00}}).populate('kode_outlet').then((dataTransaksi) => {
        Sekolah.populate(dataTransaksi, 'kode_outlet.kode_sekolah').then(dataTransaksiSekolah => {
          let totalSaldoKantin = 0
          let totalSaldo = 0
          let totalSaldoEkantin = 0
          let totalSaldoSekolah = 0
          for (var i = 0; i < dataTransaksiSekolah.length; i++) {
            let transaksiSekolah = 0
            for (var j = 0; j < dataTransaksiSekolah[i].transaksi_detail.length; j++) {
              let temp = dataTransaksiSekolah[i].transaksi_detail[j]
              let total = temp.harga_beli * (temp.jumlah_pesan - temp.jumlah_kembali)
              transaksiSekolah += total
              let fee = dataTransaksiSekolah[i].kode_outlet.kode_sekolah.fee[0]
              let feeSekolah = 0
              let feeSap = 0
              let feeSki = 0
              if (fee.jenis_fee_sekolah == 1) {
                feeSekolah += (fee.fee_sekolah * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSekolah += (total * (fee.fee_sekolah / 100))
              }
              if (fee.jenis_fee_sap == 1) {
                feeSap += (fee.fee_sap * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSap += (total * (fee.fee_sap / 100))
              }
              if (fee.jenis_fee_ski == 1) {
                feeSki += (fee.fee_ski * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSki += (total * (fee.fee_ski / 100))
              }
              totalSaldoEkantin += (feeSap + feeSki)
              totalSaldoSekolah += feeSekolah
              totalSaldoKantin += total
              totalSaldo += total
              totalSaldoKantin -= (feeSekolah + feeSap + feeSki)
            }
          }
          let totalSaldoKantinPercent = ((totalSaldoKantin / totalSaldo) * 100).toFixed(2)
          let totalSaldoEkantinPercent = ((totalSaldoEkantin / totalSaldo) * 100).toFixed(2)
          let totalSaldoSekolahPercent = ((totalSaldoSekolah / totalSaldo) * 100).toFixed(2)
          res.status(200).send({
            totalKantin: totalSaldoKantin,
            totalEkantin: totalSaldoEkantin,
            totalSekolah: totalSaldoKantin,
            totalKantinPercent: totalSaldoKantinPercent,
            totalEkantinPercent: totalSaldoEkantinPercent,
            totalSekolahPercent: totalSaldoSekolahPercent,
            totalSaldo,
          })
        })
      }).catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Internal Server Error'
        })
      })
    } else if(level_user == 1) {
      let objectUntukSearchBerdasarkanSekolah = []
      for (var i = 0; i < kode_sekolah.length; i++) {
        objectUntukSearchBerdasarkanSekolah.push({
          kode_outlet: new RegExp(kode_sekolah, 'i')
        })
      }
      Transaksi.find({tanggal_ambil: {$lte: tanggalBesok, $gte: tanggal00}, $or: [...objectUntukSearchBerdasarkanSekolah]}).populate('kode_outlet').then((dataTransaksi) => {
        Sekolah.populate(dataTransaksi, 'kode_outlet.kode_sekolah').then(dataTransaksiSekolah => {
          let totalSaldoKantin = 0
          let totalSaldo = 0
          let totalSaldoEkantin = 0
          let totalSaldoSekolah = 0
          for (var i = 0; i < dataTransaksiSekolah.length; i++) {
            let transaksiSekolah = 0
            for (var j = 0; j < dataTransaksiSekolah[i].transaksi_detail.length; j++) {
              let temp = dataTransaksiSekolah[i].transaksi_detail[j]
              let total = temp.harga_beli * (temp.jumlah_pesan - temp.jumlah_kembali)
              transaksiSekolah += total
              let fee = dataTransaksiSekolah[i].kode_outlet.kode_sekolah.fee[0]
              let feeSekolah = 0
              let feeSap = 0
              let feeSki = 0
              if (fee.jenis_fee_sekolah == 0) {
                feeSekolah += (fee.fee_sekolah * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSekolah += (total * (fee.fee_sekolah / 100))
              }
              if (fee.jenis_fee_sap == 0) {
                feeSap += (fee.fee_sap * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSap += (total * (fee.fee_sap / 100))
              }
              if (fee.jenis_fee_ski == 0) {
                feeSki += (fee.fee_ski * (temp.jumlah_pesan - temp.jumlah_kembali))
              } else {
                feeSki += (total * (fee.fee_ski / 100))
              }
              totalSaldoEkantin += (feeSap + feeSki)
              totalSaldoSekolah += feeSekolah
              totalSaldoKantin += total
              totalSaldo += total
              totalSaldoKantin -= (feeSekolah + feeSap + feeSki)
            }
          }
          let totalSaldoKantinPercent = ((totalSaldoKantin / totalSaldo) * 100).toFixed(2)
          let totalSaldoEkantinPercent = ((totalSaldoEkantin / totalSaldo) * 100).toFixed(2)
          let totalSaldoSekolahPercent = ((totalSaldoSekolah / totalSaldo) * 100).toFixed(2)
          res.status(200).send({
            totalKantin: totalSaldoKantin,
            totalEkantin: totalSaldoEkantin,
            totalSekolah: totalSaldoKantin,
            totalKantinPercent: totalSaldoKantinPercent,
            totalEkantinPercent: totalSaldoEkantinPercent,
            totalSekolahPercent: totalSaldoSekolahPercent,
            totalSaldo,
          })
        })
      }).catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Internal Server Error'
        })
      })
    }
  }
  static totalBerandaKantinMenuPelanggan(req, res, next) {
    let level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user
    let kode_sekolah = jwt.verify(req.headers.token, process.env.JWT_SALT).kode_sekolah
    if (level_user === 0) {
      let returnedObject = {
        totalSekolah: 0,
        totalKantin: 0,
        totalMenuKantin: 0,
        totalSiswaGuru: 0
      }
      Promise.all([
        Sekolah.count(),
        Menu.count(),
        Kantin.count(),
        Pelanggan.count()
      ]).then((results) => {
        returnedObject.totalSekolah = results[0]
        returnedObject.totalMenuKantin = results[1]
        returnedObject.totalKantin = results[2]
        returnedObject.totalSiswaGuru = results[3]
        res.status(200).send({
          message: 'Request Success',
          data: returnedObject
        })
      }).catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Internal Server Error'
        })
      })
    } else if(level_user === 1) {
      let returnedObject = {
        totalSekolah: kode_sekolah.length,
        totalKantin: 0,
        totalMenuKantin: 0,
        totalSiswaGuru: 0
      }
      let objectUntukSearchBerdasarkanSekolah = []
      for (var i = 0; i < kode_sekolah.length; i++) {
        objectUntukSearchBerdasarkanSekolah.push({
          kode_sekolah: kode_sekolah[i]
        })
      }
      Promise.all([
        Pelanggan.count({$or: [...objectUntukSearchBerdasarkanSekolah]}),
        Outlet.find({$or: [...objectUntukSearchBerdasarkanSekolah]})
      ]).then((results) => {
        returnedObject.totalSiswaGuru = results[0]
        let listKantinYgAda = []
        let filteredOutletYgSatuKantin = results[1]
        filteredOutletYgSatuKantin = filteredOutletYgSatuKantin.filter((data) => {
          if(listKantinYgAda.indexOf(data.kode_kantin) == -1) {
            listKantinYgAda.push(data.kode_kantin)
            return data
          }
        })
        returnedObject.totalKantin = listKantinYgAda.length
        let objectUntukSearchKantin = []
        for (var i = 0; i < listKantinYgAda.length; i++) {
          objectUntukSearchKantin.push({
            kode_kantin: listKantinYgAda[i]
          })
        }
        Menu.count({$or: [...objectUntukSearchKantin]}).then((data) => {
          returnedObject.totalMenuKantin = data
          res.status(200).send({
            message: 'Request Success',
            data: returnedObject
          })
        }).catch((err) => {
          console.log(err);
          res.status(500).send({
            message: 'Internal Server Error'
          })
        })
      }).catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Internal Server Error'
        })
      })
    }
  }
}
module.exports = BerandaCtrl;
