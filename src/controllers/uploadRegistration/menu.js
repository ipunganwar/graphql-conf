var http = require('https');
const util = require('util')
var fs = require('fs');
const Menu = require('../../models/').Menu
const JadwalMenu = require('../../models/').JadwalMenu
const Outlet = require('../../models/').Outlet
const generateRandomPassword = require('../../helpers/generateRandomPassword')
const autoGenerateIdMenu = require('../../helpers/autoGenerateIdMenu')

class MenuUploadRegistration {
  static async menuRegistration (req, res, next) {
    let namaFile = generateRandomPassword()
    namaFile += Date.now().toString()
    namaFile += '.csv'
    var file = fs.createWriteStream('src/temp/' + namaFile)
    var request = http.get(req.body.file_url, function(response) {
      response.pipe(file);
      fs.readFile('src/temp/' + namaFile, 'utf8', async (err, readerResults) => {
        if (err) throw err;
        let dataMenu = readerResults.split('\n')
        dataMenu.shift()
        let lineError = []
        let hasilGroupingObject = dataMenu.map((data, index) => {
          let hasilSplitBerdasarkanKomaPerLine = data.split(',')
          if (hasilSplitBerdasarkanKomaPerLine.length != 15) {
            lineError.push(index+1)
            return 'Format Tidak Sesuai'
          }
          try {
            let objSementara = {
              _id: '',
              kode_kantin: '',
              nama_menu: '',
              jenis_menu: '',
              foto_menu: '',
              deskripsi: '',
              tingkat_pedas: '',
              zat_besi: '',
              protein: '',
              karbohidrat: '',
              kkal: '',
              kolesterol: '',
              lemak: '',
              b1: '',
              bahan: [],
              harga: [],
              nama_vendor: ''
            }
            objSementara.nama_menu = hasilSplitBerdasarkanKomaPerLine[0]
            objSementara.jenis_menu = hasilSplitBerdasarkanKomaPerLine[1]
            objSementara.foto_menu = 'http://getdrawings.com/image/junk-food-drawing-51.jpg'
            objSementara.deskripsi = hasilSplitBerdasarkanKomaPerLine[2]
            objSementara.tingkat_pedas = hasilSplitBerdasarkanKomaPerLine[3]
            objSementara.zat_besi = hasilSplitBerdasarkanKomaPerLine[4]
            objSementara.protein = hasilSplitBerdasarkanKomaPerLine[5]
            objSementara.karbohidrat = hasilSplitBerdasarkanKomaPerLine[6]
            objSementara.kkal = hasilSplitBerdasarkanKomaPerLine[7]
            objSementara.kolesterol = hasilSplitBerdasarkanKomaPerLine[8]
            objSementara.lemak = hasilSplitBerdasarkanKomaPerLine[9]
            objSementara.b1 = hasilSplitBerdasarkanKomaPerLine[10]
            objSementara.harga.push({
              tanggal_penetapan: new Date(),
              harga: hasilSplitBerdasarkanKomaPerLine[12]
            })
            objSementara.kode_kantin = hasilSplitBerdasarkanKomaPerLine[13]
            objSementara.kode_kantin = objSementara.kode_kantin.replace('\r', '')
            objSementara.nama_vendor = hasilSplitBerdasarkanKomaPerLine[14]
            objSementara.nama_vendor = objSementara.nama_vendor.replace('\r', '')
            return objSementara
          } catch (e) {
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
          let dataMenuList = []
          let dataMenuGagalTerbuatList = []
          for (var i = 0; i < hasilGroupingObject.length; i++) {
            hasilGroupingObject[i]._id = await autoGenerateIdMenu(hasilGroupingObject[i].kode_kantin)
            let temp = await MenuUploadRegistration.createMenuBaru(hasilGroupingObject[i])
            if (typeof temp === 'string') {
              dataMenuGagalTerbuatList.push(temp)
            } else {
              dataMenuList.push(temp)
            }
          }
          fs.unlink('src/temp/' + namaFile, (err) => {
            if (err) throw err;
          })
          res.status(200).send({
            message: 'Menu Registration Process Done. \n',
            dataMenuBerhasilTerbuat: dataMenuList,
            dataMenuGagalTerbuat: dataMenuGagalTerbuatList,
          })
        }
      })
    })
  }
  static async createMenuBaru (data) {
    try {
      let dataMenuYgTerbuat = await Menu.create(data)
      let listAllOutlet = await Outlet.find({
        kode_kantin: data.kode_kantin
      })
      if(listAllOutlet.length > 0) {
        for (var i = 0; i < listAllOutlet.length; i++) {
          let objJadwalMenu = {
            kode_outlet: listAllOutlet[i]._id,
            kode_menu: dataMenuYgTerbuat._id,
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
          let temp = await JadwalMenu.create(objJadwalMenu)
        }
      }
      return dataMenuYgTerbuat
    } catch (e) {
      return data.nama_menu
    }
  }
}

module.exports = MenuUploadRegistration;
