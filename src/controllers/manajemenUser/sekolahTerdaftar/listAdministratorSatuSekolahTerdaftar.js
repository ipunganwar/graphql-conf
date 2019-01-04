const UserDashboard = require('../../../models/').UserDashboard

async function listAdministratorSatuSekolahTerdaftar (level_user, kode_sekolah, idSekolahYgMauDicari) {
  if (level_user === 0 || kode_sekolah.indexOf(idSekolahYgMauDicari) > -1) {
    try {
      let listAllUser = await UserDashboard.find()
      let adminSekolah = listAllUser.filter((user) => {
        if (user.kode_sekolah.indexOf(idSekolahYgMauDicari) > -1)
          return user
      })
      let bukanAdminSekolah = listAllUser.filter((user) => {
        if (user.kode_sekolah.indexOf(idSekolahYgMauDicari) == -1)
          return user
      })
      let returnedAdmin = []
      let returnedBukanAdmin = []
      for (var i = 0; i < adminSekolah.length; i++) {
        let temp = {
          _id: adminSekolah[i]._id,
          foto: adminSekolah[i].foto,
          nama: adminSekolah[i].nama,
          peran: adminSekolah[i].peran == 0 ? 'Super Admin' : 'Administrator',
        }
        returnedAdmin.push(temp)
      }
      for (var i = 0; i < bukanAdminSekolah.length; i++) {
        let temp = {
          _id: bukanAdminSekolah[i]._id,
          foto: bukanAdminSekolah[i].foto,
          nama: bukanAdminSekolah[i].nama,
          peran: bukanAdminSekolah[i].peran == 0 ? 'Super Admin' : 'Administrator',
        }
        returnedBukanAdmin.push(temp)
      }
      return {
        message: 'Request Success',
        status: 200,
        data: {
          bukanAdmin: returnedBukanAdmin,
          admin: returnedAdmin
        }
      }
    } catch (e) {
      console.log('/src/controllers/manajemenUser/sekolahTerdaftar/listAdministratorSatuSekolahTerdaftar/:36', e);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  } else {
    return {
      message: 'Forbidden',
      status: 403
    }
  }
}

module.exports = listAdministratorSatuSekolahTerdaftar;
