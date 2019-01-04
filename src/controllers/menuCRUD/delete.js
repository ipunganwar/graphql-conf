const Menu = require('../../models').Menu

async function deleteMenu(req, res, next) {
  const level_user = jwt.verify(req.headers.token, process.env.JWT_SALT).level_user

  if(level_user === 0) {
    try {
      let deletedDataMenu = await Menu.findByIdAndRemove(req.body._id)

      res.status(200).send({
        data: deletedDataMenu,
        status: 'Request Success',
        message: 'Request Success'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        status: 'Request Failed',
        process: 'deleteMenu'
      })
    }
  } else {
    res.status(403).send({
      message: 'Forbidden, you don\'t have access to do this action.',
      status: 'Request Failed',
      process: 'deleteMenu'
    })
  }
}

module.exports = deleteMenu;
