var http = require('https');
const util = require('util')
var fs = require('fs');
const Sekolah = require('../../models/').Sekolah
const generateRandomPassword = require('../../helpers/generateRandomPassword')

class SekolahUploadRegistration {
  static async sekolahRegistration (req, res, next) {
    let namaFile = generateRandomPassword()
    namaFile += Date.now().toString()
    namaFile += '.csv'
    var file = fs.createWriteStream('src/temp/' + namaFile);
    var request = http.get(req.body.file_url, function(response) {
      response.pipe(file);
      fs.readFile('src/temp/' + namaFile, 'utf8', async (err, readerResults) => {
        if (err) throw err;
        let dataSekolah = readerResults.split('\n')
        dataSekolah.shift()
        let lineError = []
        let hasilGroupingObject = dataSekolah.map((data, index) => {
          let hasilSplitBerdasarkanKomaPerLine = data.split(',')
          if (hasilSplitBerdasarkanKomaPerLine.length != 22) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
          try {
            let objSementara = {
              _id: '',
              nama_sekolah: '',
              password: '',
              jenjang: '',
              no_telp: '',
              alamat_sekolah: '',
              kode_pos: '',
              koordinator: '',
              email: '',
              jumlah_istirahat: {
                istirahat1: false,
                istirahat1_start: '',
                istirahat1_end: '',
                istirahat2: false,
                istirahat2_start: '',
                istirahat2_end: '',
                istirahat3: false,
                istirahat3_start: '',
                istirahat3_end: '',
              },
              potongan: [],
              waktu_transfer: '',
              rekening: [{
                nama_bank: '',
                no_rekening: '',
                atas_nama: '',
                tanggal_simpan: new Date()
              }],
              fee: [{
                tanggal_penetapan: new Date(),
                fee_sekolah: 0,
                jenis_fee_sekolah: 0,
                fee_sap: 0,
                jenis_fee_sap: 0,
                fee_ski: 0,
                jenis_fee_ski: 0,
              }]
            }
            objSementara._id = hasilSplitBerdasarkanKomaPerLine[0]
            objSementara.nama_sekolah = hasilSplitBerdasarkanKomaPerLine[1]
            objSementara.password = hasilSplitBerdasarkanKomaPerLine[2]
            objSementara.jenjang = hasilSplitBerdasarkanKomaPerLine[3]
            objSementara.no_telp = hasilSplitBerdasarkanKomaPerLine[4]
            objSementara.alamat_sekolah = hasilSplitBerdasarkanKomaPerLine[5]
            objSementara.kode_pos = hasilSplitBerdasarkanKomaPerLine[6]
            objSementara.koordinator = hasilSplitBerdasarkanKomaPerLine[7]
            objSementara.email = hasilSplitBerdasarkanKomaPerLine[8]
            let istirahat = []
            if(hasilSplitBerdasarkanKomaPerLine[9]) {
              istirahat = hasilSplitBerdasarkanKomaPerLine[9].split('#')
            }
            if(istirahat[0]) {
              objSementara.jumlah_istirahat.istirahat1 = true
              let waktuIstirahat = istirahat[0].split(':')
              objSementara.jumlah_istirahat.istirahat1_start = waktuIstirahat[0]
              objSementara.jumlah_istirahat.istirahat1_end = waktuIstirahat[1]
            }
            if (istirahat[1]) {
              objSementara.jumlah_istirahat.istirahat2 = true
              let waktuIstirahat = istirahat[1].split(':')
              objSementara.jumlah_istirahat.istirahat2_start = waktuIstirahat[0]
              objSementara.jumlah_istirahat.istirahat2_end = waktuIstirahat[1]
            }
            if (istirahat[2]) {
              objSementara.jumlah_istirahat.istirahat3 = true
              let waktuIstirahat = istirahat[2].split(':')
              objSementara.jumlah_istirahat.istirahat3_start = waktuIstirahat[0]
              objSementara.jumlah_istirahat.istirahat3_end = waktuIstirahat[1]
            }
            objSementara.rekening[0].nama_bank = hasilSplitBerdasarkanKomaPerLine[13]
            objSementara.rekening[0].atas_nama = hasilSplitBerdasarkanKomaPerLine[14]
            objSementara.rekening[0].no_rekening = hasilSplitBerdasarkanKomaPerLine[15]
            objSementara.fee[0].fee_sekolah = hasilSplitBerdasarkanKomaPerLine[16]
            objSementara.fee[0].jenis_fee_sekolah = hasilSplitBerdasarkanKomaPerLine[17]
            objSementara.fee[0].fee_sap = hasilSplitBerdasarkanKomaPerLine[18]
            objSementara.fee[0].jenis_fee_sap = hasilSplitBerdasarkanKomaPerLine[19]
            objSementara.fee[0].fee_ski = hasilSplitBerdasarkanKomaPerLine[20]
            objSementara.fee[0].jenis_fee_ski = hasilSplitBerdasarkanKomaPerLine[21]
            objSementara.fee[0].jenis_fee_ski = objSementara.fee[0].jenis_fee_ski.replace('\r', '')
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
          let dataSekolahList = []
          let dataSekolahGagalTerbuatList = []
          for (var i = 0; i < hasilGroupingObject.length; i++) {
            let temp = await SekolahUploadRegistration.createSekolahBaru(hasilGroupingObject[i])
            if (typeof temp === 'string') {
              dataSekolahGagalTerbuatList.push(temp)
            } else {
              dataSekolahList.push(temp)
            }
          }
          fs.unlink('src/temp/' + namaFile, (err) => {
            if (err) throw err;
          })
          res.status(200).send({
            message: 'Sekolah Registration Process Done. \n',
            dataSekolahBerhasilTerbuat: dataSekolahList,
            dataSekolahGagalTerbuat: dataSekolahGagalTerbuatList,
          })
        }
      })
    })
  }
  static async createSekolahBaru (data) {
    try {
      let dataSekolahYgTerbuat = await Sekolah.create(data)
      return dataSekolahYgTerbuat
    } catch (e) {
      return data._id
    }
  }
}

module.exports = SekolahUploadRegistration;
