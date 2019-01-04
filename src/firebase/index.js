var admin = require("firebase-admin");

var serviceAccount = require("./kotakmakan-bbac4-firebase-adminsdk-a8x5i-60dde4f630.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kotakmakan-bbac4.firebaseio.com"
});

module.exports = admin;
