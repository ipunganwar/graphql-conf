const firebase = require('../firebase')

let db = firebase.database()
function pushNewNotification(kode_sekolah, nama_pelanggan, total_topup) {
  db.ref(process.env.SERVER + "/notification_dashboard/" + kode_sekolah).once("value").then((snapshot) => {
    let newNotifKey = snapshot.numChildren()
    db.ref(process.env.SERVER + "/notification_dashboard/" + kode_sekolah + '/' + newNotifKey).set(nama_pelanggan + ' telah melakukan topup sebesar ' + total_topup)
  }).catch((err) => {
    console.log(err);
  })
}

module.exports = pushNewNotification
