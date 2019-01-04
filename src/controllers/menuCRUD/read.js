const Menu = require('../../models').Menu

async function readMenu (req, res, next) {
  const level_user = req.tokenContent.level_user
  if(level_user === 0) {
    try {
      let menusData = await Menu.find().populate('kode_kantin')
      res.status(200).send({
        data: menusData,
        message: 'Request Success',
        status: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readMenu'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'readMenu'
    })
  }
}

module.exports = readMenu
