const Kantin = require('../../models').Kantin

async function readKantin (req, res, next) {
  const level_user = req.tokenContent.level_user

  if(level_user === 0) {
    try {
      let KantinsData = await Kantin.find()

      res.status(200).send({
        data: KantinsData,
        message: 'Request Success',
        status: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'readKantin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'readKantin'
    })
  }
}

module.exports = readKantin;
