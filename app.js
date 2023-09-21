const express = require("express");
const cors = require("cors") ;
const mongoose = require("mongoose");

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

