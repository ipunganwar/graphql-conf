const Menu            = require('../../models').Menu
const IdMenuGenerator = require('../../helpers/autoGenerateIdMenu')
const JadwalMenu      = require('../../models/jadwalMenuModel')
const Outlet          = require('../../models/outletModel')

async function createMenu (req, res, next) {
  const level_user = req.tokenContent.level_user

  if(level_user === 0) {
    try {
      let tempDataMenu = new Menu({
        _id: await IdMenuGenerator(req.body.kode_kantin),
        kode_kantin: req.body.kode_kantin,
        nama_menu: req.body.nama_menu,
        jenis_menu: req.body.jenis_menu,
        foto_menu: req.body.foto_menu,
        deskripsi: req.body.deskripsi,
        tingkat_pedas: req.body.tingkat_pedas,
        zat_besi: req.body.zat_besi,
        protein: req.body.protein,
        karbohidrat: req.body.karbohidrat,
        kkal: req.body.kkal,
        kolesterol: req.body.kolesterol,
        lemak: req.body.lemak,
        b1: req.body.b1,
        bahan: req.body.bahan,
        harga:[{
          tanggal_penetapan: new Date(),
          harga: req.body.harga
        }],
        promo: [],
        nama_vendor: req.body.nama_vendor
      })

      let newMenuData = await tempDataMenu.save()
      let tempListOutlet = await Outlet.find({
        'kode_kantin': req.body.kode_kantin
      })

      if(tempListOutlet.length < 1) {
        res.status(200).send(newMenuData)
      }

      let newListJadwal = []

      for(let i = 0; i< tempListOutlet.length; i++) {
        let tempNewJadwalMenu = new JadwalMenu({
          kode_outlet: tempListOutlet[i]._id,
          kode_menu: newMenuData._id,
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
        })

        let newJadwalMenu = await tempNewJadwalMenu.save()
        newListJadwal.push(newJadwalMenu)

        if(i === tempListOutlet.length -1) {
          res.status(200).send({
            data: newListJadwal,
            status: 'Request Success',
            message: 'Request Success'
          })
        }
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'createMenu'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'createMenu'
    })
  }
}

module.exports = createMenu;
