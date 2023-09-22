const express = require("express");
const cors = require("cors") ;
const mongoose = require("mongoose");
const { auth } = require('express-oauth2-jwt-bearer');
const routes = require("./src/Routes")

const app = express();


app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type.Authorization");
  next();
});
// const checkJwt = jwt({
//   // Your Auth0 domain and audience
//   audience: 'your-audience',
//   issuer: 'https://your-auth0-domain/',
//   algorithms: ['RS256'],
//   // Fetch JSON Web Key Set (JWKS) from Auth0
//   jwksUri: 'https://your-auth0-domain/.well-known/jwks.json',
// });
// const jwtCheck = auth({
//   audience: 'https://t24e10s16t',
//   issuerBaseURL: 'https://dev-qc04gxfq7jiu1eh3.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// }).unless({path:"/prohome"});

// enforce on all endpoints
// app.use(jwtCheck);


app.use(routes)


//DB connect//
mongoose
.connect('mongodb+srv://root:root@cluster0.bffwlke.mongodb.net/Shop',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("connect!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
console.log("run");

