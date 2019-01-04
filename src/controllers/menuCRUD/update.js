const Menu = require('../../models').Menu

async function updateMenu(req, res, next) {
  const level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user

  if(level_user === 0) {
    try {
      let tempMenuData = {}
      if(req.body.kode_kantin) {
        tempMenuData.kode_kantin = req.body.kode_kantin
      }

      if(req.body.nama_menu) {
        tempMenuData.nama_menu = req.body.nama_menu
      }

      if(req.body.jenis_menu) {
        tempMenuData.jenis_menu = req.body.jenis_menu
      }

      if(req.body.foto_menu) {
        tempMenuData.foto_menu = req.body.foto_menu
      }

      if(req.body.deskripsi) {
        tempMenuData.deskripsi = req.body.deskripsi
      }

      if(req.body.tingkat_pedas) {
        tempMenuData.tingkat_pedas = req.body.tingkat_pedas
      }

      if(req.body.zat_besi) {
        tempMenuData.zat_besi = req.body.zat_besi
      }

      if(req.body.protein) {
        tempMenuData.protein = req.body.protein
      }

      if(req.body.karbohidrat) {
        tempMenuData.karbohidrat = req.body.karbohidrat
      }

      if(req.body.kkal) {
        tempMenuData.kkal = req.body.kkal
      }

      if(req.body.kolesterol) {
        tempMenuData.kolesterol = req.body.kolesterol
      }

      if(req.body.lemak) {
        tempMenuData.lemak = req.body.lemak
      }

      if(req.body.b1) {
        tempMenuData.b1 = req.body.b1 || tempMenuData.b1
      }

      if(req.body.bahan) {
        tempMenuData.bahan = req.body.bahan
      } else {
        tempMenuData.bahan = []
      }

      if (req.body.nama_vendor) {
        tempMenuData.nama_vendor = req.body.nama_vendor
      }

      tempMenuData.promo = []

      let tempHargaData = {}

      if (req.body.harga) {
        let tempTanggalPenetapan = new Date()
        tempTanggalPenetapan.setDate(tempTanggalPenetapan.getDate() + 6)
        tempHargaData.harga = {
          tanggal_penetapan: tempTanggalPenetapan,
          harga: req.body.harga
        }
      }

      let setTempUpdate = {
        $set: tempMenuData,
        $push: tempHargaData
      }

      if(!req.body.harga) {
        delete setTempUpdate.$push
      }

      let newMenuData = await Menu.findByIdAndUpdate(req.body._id, setTempUpdate)

      res.status(200).send({
        data: newMenuData,
        status: 'Request Success',
        message: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'updateMenu'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'updateMenu'
    })
  }
}

module.exports = updateMenu;
