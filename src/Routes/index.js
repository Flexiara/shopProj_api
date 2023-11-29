const express = require("express");
const router = express.Router();



const Register= require("../Controller/register");
const Product = require("../Controller/products");
const AuthApi = require("../Middleware/authMiddleware");


router.post("/login", Register.loginAcc);
router.post("/register", Register.registerAcc);

router.get("/home", Register.getUserDetails);

router.get("/get-products", Product.getProducts);

router.post("/add-porducts", AuthApi.authApi, Product.addProducts);
router.post("/edit-porducts", AuthApi.authApi, Product.editProducts);
router.post("/remove-porducts", AuthApi.authApi, Product.removeProducts);

router.post("/add-product-cart", AuthApi.authApi, Product.addProductToCart);
router.post("/purchase-products", AuthApi.authApi, Product.purchaseProducts);

router.post("/add-sample", AuthApi.authApi, Product.sampleAdd);






module.exports = router;

