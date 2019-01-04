const addUser                 = require('./addExample').add;
const addUserTablet           = require('./userTablet/addUser').addUserTablet
const editProfileOutletDetail = require('./outlet/editProfileOutletDetail')
const editProfileOutletAkun   = require('./outlet/editProfileOutletAkun')
const editProfileOutletBank   = require('./outlet/editProfileOutletBank')
const editProfilePelanggan    = require('./editProfilePelanggan')
const readNotification    = require('./readNotification')
const topupTransfer           = require('./topupTransfer')
const addJadwalMenuByIdOutlet = require('./outlet/createJadwalMenuByIdMenu')
const addMultipleJadwalMenu   = require('./outlet/addMultipleJadwalMenu')
// var updateUser = require('./update').update;

module.exports = {
  addUser,
  addUserTablet,
  editProfileOutletDetail,
  editProfileOutletAkun,
  editProfileOutletBank,
  editProfilePelanggan,
  readNotification,
  topupTransfer,
  addJadwalMenuByIdOutlet,
  addMultipleJadwalMenu,
  // updateUser
}
