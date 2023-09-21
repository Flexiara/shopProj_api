const express = require("express");
const router = express.Router();


const Register= require("../Controller/register")


router.post("/login", Register.loginAcc)
router.post("/register", Register.registerAcc);


module.exports = router;

