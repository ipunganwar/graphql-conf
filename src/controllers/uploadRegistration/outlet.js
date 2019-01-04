var http = require('https');
const util = require('util')
var fs = require('fs');
const generateRandomPassword = require('../../helpers/generateRandomPassword')
const Outlet = require('../../models/').Outlet
const User = require('../../models/').User
const JadwalMenu = require('../../models/').JadwalMenu
const Menu = require('../../models/').Menu
const autoGenerateIdOutlet = require('../../helpers/autoGenerateIdOutlet')
const encrypt = require('../../helpers/cryptoHelper')
const axios = require('axios')

class OutletUploadRegistration {
  static async outletRegistration(req, res, next) {
    let namaFile = generateRandomPassword()
    namaFile += Date.now().toString()
    namaFile += '.csv'
    var file = fs.createWriteStream('src/temp/' + namaFile)
    var request = http.get(req.body.file_url, function(response) {
      response.pipe(file);
      fs.readFile('src/temp/' + namaFile, 'utf8', async (err, readerResults) => {
        if (err) throw err;
        let dataOutlet = readerResults.split('\n')
        dataOutlet.shift()
        let lineError = []
        let hasilGroupingObject = dataOutlet.map((data, index) => {
          let hasilSplitBerdasarkanKomaPerLine = data.split(',')
          if (hasilSplitBerdasarkanKomaPerLine.length != 15) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
          try {
            let objSementaraOutlet = {
              _id: "",
              kode_kantin: "",
              kode_sekolah: "",
              nama_outlet: "",
              no_telepon: "",
              foto_pemilik: "",
              nama_pemilik: "",
              alamat_pemilik: "",
              email_pemilik: "",
              saldo: 0,
              status: 0,
              kode_perangkat: "",
              rekening: {
                nama_bank: "",
                no_rekening: "",
                atas_nama: "",
                tanggal_simpan: ""
              }
            }
            let objSementaraUser = {
              username: "",
              password: ""
            }
            objSementaraOutlet.kode_kantin = hasilSplitBerdasarkanKomaPerLine[14]
            objSementaraOutlet.kode_sekolah = hasilSplitBerdasarkanKomaPerLine[0]
            objSementaraOutlet.nama_outlet = hasilSplitBerdasarkanKomaPerLine[1]
            objSementaraOutlet.no_telepon = hasilSplitBerdasarkanKomaPerLine[2]
            objSementaraOutlet.nama_pemilik = hasilSplitBerdasarkanKomaPerLine[3]
            objSementaraOutlet.alamat_pemilik = hasilSplitBerdasarkanKomaPerLine[4]
            objSementaraOutlet.email_pemilik = hasilSplitBerdasarkanKomaPerLine[5]
            objSementaraOutlet.kode_perangkat = hasilSplitBerdasarkanKomaPerLine[8]
            objSementaraOutlet.rekening.nama_bank = hasilSplitBerdasarkanKomaPerLine[9]
            objSementaraOutlet.rekening.no_rekening = hasilSplitBerdasarkanKomaPerLine[10]
            objSementaraOutlet.rekening.atas_nama = hasilSplitBerdasarkanKomaPerLine[11]
            objSementaraOutlet.rekening.tanggal_simpan = new Date()
            objSementaraUser.username = hasilSplitBerdasarkanKomaPerLine[12]
            objSementaraUser.password = hasilSplitBerdasarkanKomaPerLine[13]
            return {
              outlet: objSementaraOutlet,
              user: objSementaraUser
            }
          } catch (e) {
            console.log(e)
            return 'Format Tidak Sesuai'
          }
        })
        if (lineError.length > 0) {
          // lanjut throw error
          res.status(500).send({
            message: 'There\'s data with wrong format in csv files',
            line: lineError
          })
        } else {
          let dataOutletList = []
          let dataOutletGagalTerbuatList = []
          for (var i = 0; i < hasilGroupingObject.length; i++) {
            hasilGroupingObject[i]._id = await autoGenerateIdOutlet(hasilGroupingObject[i])
            let temp = await OutletUploadRegistration.createOutletBaru(hasilGroupingObject[i])
            if (typeof temp === 'string') {
              dataOutletGagalTerbuatList.push(temp)
            } else {
              dataOutletList.push(temp)
            }
          }
          fs.unlink('src/temp/' + namaFile, (err) => {
            if (err) throw err;
          })
          res.status(200).send({
            message: 'Outlet Registration Process Done. \n',
            dataOutletBerhasilTerbuat: dataOutletList,
            dataOutletGagalTerbuat: dataOutletGagalTerbuatList,
          })
        }
      })
    })
  }
  static async createOutletBaru (dataOutlet) {
    let idOutlet = await autoGenerateIdOutlet(dataOutlet.outlet.kode_kantin, dataOutlet.outlet.kode_sekolah)
    try {
      let outletTerbuat = await Outlet.create({
        _id: idOutlet,
        kode_kantin: dataOutlet.outlet.kode_kantin,
        kode_sekolah: dataOutlet.outlet.kode_sekolah,
        nama_outlet: dataOutlet.outlet.nama_outlet,
        no_telepon: dataOutlet.outlet.no_telepon,
        foto_pemilik: 'https://cdn.onlinewebfonts.com/svg/img_191958.png',
        nama_pemilik: dataOutlet.outlet.nama_pemilik,
        alamat_pemilik: dataOutlet.outlet.alamat_pemilik,
        email_pemilik: dataOutlet.outlet.email_pemilik,
        saldo: 0,
        status: 0,
        kode_perangkat: dataOutlet.outlet.kode_perangkat,
        rekening: dataOutlet.outlet.rekening,
        notifikasi: [{
          tanggal_waktu: new Date(),
          notifikasi: 'Hi ' + dataOutlet.outlet.nama_outlet + ', akun eKantin kamu baru saja terbuat. Jangan lupa untuk cek pesanan makanan setiap hari ya',
          baca: false
        }],
        riwayat_user: [{
          tanggal_waktu: new Date(),
          alamat_ip: '0.0.0.0',
          kegiatan: 'Admin Membuat Outlet'
        }]
      })
      let userOutletTerbuat = await User.create({
        username: dataOutlet.user.username,
        password: encrypt(dataOutlet.user.password),
        kode_referensi: idOutlet,
        tipe_user: 0
      })
      let url = process.env.WALLET_API+"?methods=tambahAkunWalletBaru"
      let data = JSON.stringify({
        kode_user: idOutlet,
      })
      let createUserPostgres = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.X_API_KEY
        },
      })
      let daftarMenu = await Menu.find({
        kode_kantin: dataOutlet.outlet.kode_kantin
      })
      let tempJadwalMenu = []
      for (var i = 0; i < daftarMenu.length; i++) {
        let objJadwalMenu = {
          kode_outlet: idOutlet,
          kode_menu: daftarMenu[i]._id,
          tanggal_penetapan: new Date(),
          istirahat1: true,
          istirahat2: true,
          istirahat3: true,
          senin: true,
          selasa: true,
          rabu: true,
          kamis: true,
          jumat: true,
          sabtu: true,
          minggu: true,
        }
        tempJadwalMenu.push(JadwalMenu.create(objJadwalMenu))
      }
      let jadwalMenuTerbuat = await Promise.all(tempJadwalMenu)
      return {
        outlet: outletTerbuat,
        userOutlet: userOutletTerbuat
      }
    } catch (e) {
      console.log(e)
      let outletRemoved = await Outlet.findByIdAndRemove(idOutlet)
      let userRemoved = await User.findOneAndRemove({username: dataOutlet.outlet.username, kode_referensi: idOutlet})
      return dataOutlet.outlet.nama_outlet
    }
  }
}

module.exports = OutletUploadRegistration;
