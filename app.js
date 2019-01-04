require('dotenv').config()
const express     = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const mobileAuth = require('./src/routers/mobileAuth')
const dashboardAuth = require('./src/routers/dashboardAuth')
const tabletAuth = require('./src/routers/tabletAuth')
const dashboardBeranda = require('./src/routers/dashboardBeranda')
const dashboardUserRouter = require('./src/routers/dashboardUserRouter')
const dashboardTopupRouter = require('./src/routers/dashboardTopupRouter')
const dashboardPencairanRouter = require('./src/routers/dashboardPencairanRouter')
const dashboardOutletRouter = require('./src/routers/dashboardOutletRouter')
const dashboardJadwalTutupRouter = require('./src/routers/dashboardJadwalTutupRouter')
const dashboardUploadRegistration = require('./src/routers/dashboardUploadRegistration')
const dashboardManajemenUser = require('./src/routers/dashboardManajemenUser')
const dashboardManajemenSekolah = require('./src/routers/dashboardManajemenSekolah')
const dashboardSekolahRouter = require('./src/routers/dashboardSekolahRouters')
const dashboardKantinRouter = require('./src/routers/dashboardKantinRouters')
const dashboardAdminRouter = require('./src/routers/dashboardAdminRouters')
const dashboardMenuRouter = require('./src/routers/dashboardMenuRouters')
const dashboardTransaksiRouter = require('./src/routers/dashboardTransaksiRouter')
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_URI);
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
}).on('open', function () {
    console.log('Connection extablised with MongoDB')
})

const userSchema = require('./src/graphql/index').userSchema;
app.use('*', cors());

app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/mobile/auth/', mobileAuth)
app.use('/tablet/auth/', tabletAuth)
app.use('/dashboard/auth/', dashboardAuth)
app.use('/dashboard/beranda/', dashboardBeranda)
app.use('/dashboard/uploadRegistration/', dashboardUploadRegistration)
app.use('/dashboard/manajemenUser/', dashboardManajemenUser)
app.use('/dashboard/manajemenSekolah/', dashboardManajemenSekolah)
app.use('/dashboard/sekolah/', dashboardSekolahRouter)
app.use('/dashboard/kantin/', dashboardKantinRouter)
app.use('/dashboard/admin/', dashboardAdminRouter)
app.use('/dashboard/menu/', dashboardMenuRouter)
app.use('/dashboard/transaksi/', dashboardTransaksiRouter)
app.use('/dashboard/user/', dashboardUserRouter)
app.use('/dashboard/topup/', dashboardTopupRouter)
app.use('/dashboard/pencairan/', dashboardPencairanRouter)
app.use('/dashboard/outlet/', dashboardOutletRouter)
app.use('/dashboard/jadwalTutup/', dashboardJadwalTutupRouter)

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
// const jwt = require('jsonwebtoken');
//
// let aa = jwt.sign({_id: '5aa8dd799d644f260c59de90', username: 'bubu'}, 'secretjuga')
// console.log(aa)
