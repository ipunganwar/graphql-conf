require('dotenv').config()
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const verifyToken = require("./src/helpers/verifyToken")
const app = express();

app.use('*', cors());

const userSchema = require('./src/graphql/index').userSchema;

app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
// const jwt = require('jsonwebtoken');
//
// let aa = jwt.sign({_id: '5aa8dd799d644f260c59de90', username: 'bubu'}, 'secretjuga')
// console.log(aa)
