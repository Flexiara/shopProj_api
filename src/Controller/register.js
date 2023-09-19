const User = require("../Models/user.modal")

const loginAcc =async (req, res, next) => {
    userName= req.userName
    password = req.password
    try {

    } 
    catch(err){
        next(err)
    }
}

const registerAcc = async(req, res, next) => {   console.log(">>>tryryrtyrty>>");
   try {
  const result = await User.save(req)
//   res.json(result)
   }
   catch(err){
    next(err)
   }
}



module.exports = {
    registerAcc
}