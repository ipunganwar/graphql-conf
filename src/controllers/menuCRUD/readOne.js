const Menu = require('../../models').Menu

async function readOneMenu(req, res, next) {
  const level_user = req.tokenContent.level_user
  if(level_user === 0) {
    try {
      let menusData = await Menu.find({_id: req.query.id}).populate('kode_kantin')
      res.status(200).send({
        data: menusData,
        status: 'Request Success',
        message: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readOneMenu'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'readOneMenu'
    })
  }
}

module.exports = readOneMenu;
