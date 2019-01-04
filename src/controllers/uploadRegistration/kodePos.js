var http = require('https')
const util = require('util')
var fs = require('fs')
const generateRandomPassword = require('../../helpers/generateRandomPassword')
const autoGenerateIdKantin = require('../../helpers/autoGenerateIdKantin')
const Wilayah = require('../../models/').Wilayah
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+'admin'+':'+'JjvS3vtbGk'+'@'+'donkeycamp-shard-00-00-ewybp.gcp.mongodb.net:27017,donkeycamp-shard-00-01-ewybp.gcp.mongodb.net:27017,donkeycamp-shard-00-02-ewybp.gcp.mongodb.net:27017/ekantindb?ssl=true&replicaSet=donkeycamp-shard-0&authSource=admin&retryWrites=true');

class KodePosUploadRegistration {
  static async kodePos() {
    fs.readFile('src/temp/kodePos.csv', 'utf8', async(err, readerResults) => {
      if (err) throw err;
      let dataKodePos = readerResults.split('\n')
      dataKodePos.shift()
      let lineError = []
      let hasilGroupingObject = dataKodePos.map((data, index) => {
        let hasilSplitBerdasarkanKomaPerLine = data.split(',')
        let hasilSplitBerdasarkanKomaPerLineIndexMin = dataKodePos[index - 1] ? dataKodePos[index - 1].split(',') : null
        if (hasilSplitBerdasarkanKomaPerLine.length != 8) {
          lineError.push(index+1)
          return 'Format Tidak Sesuai'
        } else {
          if (index !=0 && hasilSplitBerdasarkanKomaPerLine[0] == hasilSplitBerdasarkanKomaPerLineIndexMin[0]) {
            return;
          }
          try {
            let objSementaraKodePos = {
              _id: '',
              provinsi: '',
              kota: '',
              kecamatan: ''
            }
            objSementaraKodePos._id = hasilSplitBerdasarkanKomaPerLine[0]
            objSementaraKodePos.provinsi = hasilSplitBerdasarkanKomaPerLine[5]
            objSementaraKodePos.kota = hasilSplitBerdasarkanKomaPerLine[3] + ' '
            objSementaraKodePos.kota += hasilSplitBerdasarkanKomaPerLine[4]
            objSementaraKodePos.kecamatan = hasilSplitBerdasarkanKomaPerLine[2]
            return objSementaraKodePos
          } catch (e) {
            console.log(e)
            return 'Format Tidak Sesuai'
          }
        }
      })
      if (lineError.length > 0) {
        // lanjut throw error
        console.log('error', lineError);
      } else {
        let dataKodePosList = []
        let dataKodePosGagalTerbuatList = []
        for (var i = 0; i < hasilGroupingObject.length; i++) {
          let temp = await KodePosUploadRegistration.createKodePosBaru(hasilGroupingObject[i])
          console.log(temp)
          if (typeof temp === 'string') {
            dataKodePosGagalTerbuatList.push(temp)
          } else {
            dataKodePosList.push(temp)
          }
        }
        console.log(dataKodePosList)
        console.log(dataKodePosGagalTerbuatList)
        console.log(dataKodePosList.length + dataKodePosGagalTerbuatList.length)
        console.log(dataKodePosList.length)
        console.log(dataKodePosGagalTerbuatList.length)
      }
    })
  }
  static async createKodePosBaru (data) {
    try {
      let dataKodePosYgTerbuat = await Wilayah.create(data)
      console.log(dataKodePosYgTerbuat)
      return dataKodePosYgTerbuat
    } catch (e) {
      console.error(e);
      return data.kecamatan
    }
  }
}

KodePosUploadRegistration.kodePos()
