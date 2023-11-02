const express = require("express");
const cors = require("cors") ;
const mongoose = require("mongoose");
const { auth } = require('express-oauth2-jwt-bearer');
const routes = require("./src/Routes")
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 100, // Adjust the maximum field name size
    fieldSize: 1024 * 1024 * 40, // Adjust the maximum field size (e.g., 40MB)
  },
});
// const upload = multer({ storage: storage });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type.Authorization");
  next();
});
app.use(upload.single("image")); // Assuming "image" is the field name for the uploaded image
app.use('/avator', express.static('D:/Alliancetest/shopProj_api/upload/avators'));
app.use(routes)


app.get('/get-excel', (req, res) => {
  const filePath = path.join(__dirname, '', "upload","avators", "Presidents.xlsx");
  res.sendFile(filePath);
});
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

