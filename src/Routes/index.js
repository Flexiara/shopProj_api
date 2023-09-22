const express = require("express");
const router = express.Router();


const Register= require("../Controller/register")


router.post("/login", Register.loginAcc)
router.post("/register", Register.registerAcc);
router.get("/home", Register.logHome);
router.get("/prohome", Register.logNoHome);




module.exports = router;

