var http = require('https');
const util = require('util')
var fs = require('fs');
const Pelanggan = require('../../models/').Pelanggan
const generateRandomPassword = require('../../helpers/generateRandomPassword')
const randomStringGenerator = require('../../helpers/randomStringGenerator')
const axios = require('axios')
var encrypt = require('../../helpers/cryptoHelper')

class UserUploadRegistration {
  static async userRegistration (req, res, next) {
    let namaFile = generateRandomPassword()
    namaFile += Date.now().toString()
    namaFile += '.csv'
    var file = fs.createWriteStream('src/temp/' + namaFile);
    var request = http.get(req.body.file_url, function(response) {
      response.pipe(file);
      fs.readFile('src/temp/' + namaFile, 'utf8', async (err, readerResults) => {
        if (err) throw err;
        let dataUser = readerResults.split('\n')
        dataUser.shift()
        let lineError = []
        let hasilGroupingObject = dataUser.map((data, index) => {
          let hasilSplitBerdasarkanKomaPerLine = data.split(',')
          if (hasilSplitBerdasarkanKomaPerLine.length != 10) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
          try {
            let objSementara = {
              _id: '',
              kode_sekolah: '',
              email: '',
              alamat: '',
              kelas: '',
              username: '',
              password: '',
              foto_pelanggan: '',
              nama_pelanggan: '',
              peran: 0,
              saldo: 0,
              telepon: '',
              notifikasi: [{
                tanggal_waktu: new Date(),
                notifikasi: 'Hi ' + hasilSplitBerdasarkanKomaPerLine[6] + ', akun eKantin kamu baru saja terbuat. Jangan lupa pesan makanan pakai eKantin ya',
                baca: false
              }],
              riwayat_user: [{
                tanggal_waktu: new Date(),
                alamat_ip: req.ip,
                kegiatan: 'Admin Membuat User'
              }]
            }
            objSementara.kode_sekolah = hasilSplitBerdasarkanKomaPerLine[0]
            objSementara.email = hasilSplitBerdasarkanKomaPerLine[1]
            objSementara.alamat = hasilSplitBerdasarkanKomaPerLine[2]
            objSementara.kelas = hasilSplitBerdasarkanKomaPerLine[3]
            objSementara.username = hasilSplitBerdasarkanKomaPerLine[4]
            objSementara.password = encrypt(hasilSplitBerdasarkanKomaPerLine[5])
            objSementara.foto_pelanggan = "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
            objSementara.nama_pelanggan = hasilSplitBerdasarkanKomaPerLine[6]
            objSementara.peran = hasilSplitBerdasarkanKomaPerLine[7]
            objSementara.telepon = hasilSplitBerdasarkanKomaPerLine[9]
            objSementara.telepon = objSementara.telepon.replace('\r', '')
            objSementara._id = randomStringGenerator(12)
            return objSementara
          } catch (e) {
            console.log(e)
            lineError.push(index+1)
            return "Format Tidak Sesuai"
          }
        })
        if (lineError.length > 0) {
          // lanjut throw error
          res.status(500).send({
            message: 'There\'s data with wrong format in csv files',
            line: lineError
          })
        } else {
          // lanjut POST
          let dataUserList = []
          let dataUserGagalTerbuatList = []
          for (var i = 0; i < hasilGroupingObject.length; i++) {
            let temp = await UserUploadRegistration.createUserBaru(hasilGroupingObject[i])
            if (typeof temp === 'string') {
              dataUserGagalTerbuatList.push(temp)
            } else {
              dataUserList.push(temp)
            }
          }
          fs.unlink('src/temp/' + namaFile, (err) => {
            if (err) throw err;
          })
          res.status(200).send({
            message: 'User Registration Process Done. \n',
            dataUserBerhasilTerbuat: dataUserList,
            dataUserGagalTerbuat: dataUserGagalTerbuatList,
          })
        }
      })
    })
  }
  static async createUserBaru (dataPelannganNi) {
    try {
      let dataUserYgTerbuat = await Pelanggan.create(dataPelannganNi)
      let url = process.env.WALLET_API+"?methods=tambahAkunWalletBaru"
      let data = JSON.stringify({
        kode_user: dataPelannganNi._id,
      })
      let dataDariAxios = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.X_API_KEY
        },
      })
      return dataUserYgTerbuat
    } catch (e) {
      console.log(e)
      let dataUserDeleted = await Pelanggan.findByIdAndRemove(dataPelannganNi._id)
      return dataPelannganNi.username
    }
  }
}

module.exports = UserUploadRegistration;
