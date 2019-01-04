function checkAdminAccess(kode_sekolah, user, activity) {
  switch (user.level_user) {
    case 0:
        return true
      break;
    case 1:
        if(user.kode_sekolah.indexOf(kode_sekolah) > -1)
          return true
        else
          return false
      break;
    case 2:
        if (activity == 'READ') {
          if (user.kode_sekolah.indexOf(kode_sekolah) > -1)
            return true
          else
            return false
        }
        else
          return false
      break;
    default:
      return false
  }
}

module.exports = checkAdminAccess;
