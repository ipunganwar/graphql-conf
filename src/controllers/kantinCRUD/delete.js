const Kantin = require('../../models').Kantin

async function deleteKantin (req, res, next) {
  const level_user = req.tokenContent.level_user

  if(level_user === 0) {
    try {
      let deletedKantinData = await Kantin.findByIdAndRemove(req.body._id)
      res.status(200).send(deletedKantinData)
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'deleteKantin'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'deleteKantin'
    })
  }
}

module.exports = deleteKantin;
