var http = require('https');
const util = require('util')
var fs = require('fs');
const generateRandomPassword = require('../../helpers/generateRandomPassword')
const autoGenerateIdKantin = require('../../helpers/autoGenerateIdKantin')
const Kantin = require('../../models/').Kantin

class KantinUploadRegistration {
  static async kantinRegistration(req, res, next) {
    let namaFile = generateRandomPassword()
    namaFile += Date.now().toString()
    namaFile += '.csv'
    var file = fs.createWriteStream('src/temp/' + namaFile)
    var request = http.get(req.body.file_url, function(response) {
      response.pipe(file);
      fs.readFile('src/temp/' + namaFile, 'utf8', async (err, readerResults) => {
        if (err) throw err;
        let dataKantin = readerResults.split('\n')
        dataKantin.shift()
        let lineError = []
        let hasilGroupingObject = dataKantin.map((data, index) => {
          let hasilSplitBerdasarkanKomaPerLine = data.split(',')
          if (hasilSplitBerdasarkanKomaPerLine.length != 3) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
          try {
            let objSementara = {
              _id: '',
              nama_kantin: '',
              no_telepon: '',
              foto_kantin: '',
              tanggal_register: new Date()
            }
            objSementara.nama_kantin = hasilSplitBerdasarkanKomaPerLine[0]
            objSementara.no_telepon = hasilSplitBerdasarkanKomaPerLine[1]
            objSementara.foto_kantin = hasilSplitBerdasarkanKomaPerLine[2]
            return objSementara
          } catch (e) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
        })
        if (lineError.length > 0) {
          // lanjut throw error
          res.status(500).send({
            message: 'There\'s data with wrong format in csv files',
            line: lineError
          })
        }
        let dataKantinList = []
        let dataKantinGagalTerbuatList = []
        for (var i = 0; i < hasilGroupingObject.length; i++) {
          hasilGroupingObject[i]._id = await autoGenerateIdKantin(hasilGroupingObject[i])
          let temp = await KantinUploadRegistration.createKantinBaru(hasilGroupingObject[i])
          if (typeof temp === 'string') {
            dataKantinGagalTerbuatList.push(temp)
          } else {
            dataKantinList.push(temp)
          }
        }
        fs.unlink('src/temp/' + namaFile, (err) => {
          if (err) throw err;
        })
        res.status(200).send({
          message: 'Kantin Registration Process Done. \n',
          dataKantinBerhasilTerbuat: dataKantinList,
          dataKantinGagalTerbuat: dataKantinGagalTerbuatList,
        })
      })
    })
  }
  static async createKantinBaru (data) {
    try {
      let dataKantinYgTerbuat = await Kantin.create(data)
      return dataKantinYgTerbuat
    } catch (e) {
      return data.nama_kantin
    }
  }
}

module.exports = KantinUploadRegistration;
