function dayConverter(date) {
  let returnedDate = ''
  let datify = new Date(date)
  switch (datify.getDay()) {
    case 0:
        returnedDate='Minggu '
      break;
    case 1:
        returnedDate='Senin '
      break;
    case 2:
        returnedDate='Selasa '
      break;
    case 3:
        returnedDate='Rabu '
      break;
    case 4:
        returnedDate='Kamis '
      break;
    case 5:
        returnedDate='Jumat '
      break;
    case 6:
        returnedDate='Sabtu '
      break;
    default:
  }
  return returnedDate
}

function monthConverter(date) {
  let returnedDate = ''
  let datify = new Date(date)
  switch (datify.getMonth()) {
    case 0:
        returnedDate='Januari'
      break;
    case 1:
        returnedDate='Februari'
      break;
    case 2:
        returnedDate='Maret'
      break;
    case 3:
        returnedDate='April'
      break;
    case 4:
        returnedDate='Mei'
      break;
    case 5:
        returnedDate='Juni'
      break;
    case 6:
        returnedDate='Juli'
      break;
    case 7:
        returnedDate='Agustus'
      break;
    case 8:
        returnedDate='September'
      break;
    case 9:
        returnedDate='Oktober'
      break;
    case 10:
        returnedDate='November'
      break;
    case 11:
        returnedDate='Desember'
      break;
    default:
  }
  return returnedDate
}
module.exports = {
  dayConverter,
  monthConverter
};
