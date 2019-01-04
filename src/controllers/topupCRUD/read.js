const Topup = require('../../models/').Topup
function readTopupFunc (req, res, next) {
  let kode_sekolah = req.tokenContent.kode_sekolah
  let level_user = req.tokenContent.level_user
  Topup.find().sort({_id: -1}).populate('kode_pelanggan').then((data) => {
    let filterDataBasedOnAdminAccess
    if (level_user === 0) {
      filterDataBasedOnAdminAccess = data
    } else {
      filterDataBasedOnAdminAccess = data.filter((d) => {
        try {
          if (kode_sekolah.indexOf(d.kode_pelanggan.kode_sekolah) > - 1) {
            return d
          }
        } catch (e) {

        }
      })
    }
    res.send({
      message: 'Request Success',
      status: 'Request Success',
      data: filterDataBasedOnAdminAccess
    })
  }).catch((err) => {
    res.status(500).send({
      message: 'There\'s some error in the server',
      status: 'Request Failed',
      process: 'topupRead'
    })
  })
}

module.exports = readTopupFunc;
