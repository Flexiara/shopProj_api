const express = require("express");
const router = express.Router();


const Register= require("../Controller/register")
const Product = require("../Controller/products")


router.post("/login", Register.loginAcc)
router.post("/register", Register.registerAcc);
router.get("/home", Register.getUserDetails)
router.get("/get-porducts", Product.getProducts)
router.post("/add-porducts", Product.addProducts)






module.exports = router;

