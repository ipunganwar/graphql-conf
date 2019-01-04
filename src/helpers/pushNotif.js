const axios     = require('axios')
const Pelanggan = require('../models/pelangganModel')

async function pushNotifHelper(token, title, message, payload) {
  try {
    const dataPelanggan = await Pelanggan.findById(token)

    axios.post('https://fcm.googleapis.com/fcm/send', {
      "to" : dataPelanggan.device_token,
      "collapse_key" : "type_a",
      "notification" : {
        "body" : message,
        "title" : title
      },
      "data" : payload
    }, {
      headers: {
        'Authorization': `key=${process.env.FCM_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }) 
  } catch (error) {
    console.error('push notif helper', error)
  }
}

module.exports = pushNotifHelper