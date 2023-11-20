const jwt = require ("jsonwebtoken");
const User = require("../Models/user.modal")




const authApi = async (req, res, next) => {
    let token
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
           token = req.headers.authorization.split(" ")[1]
           const decode = jwt.verify(token, "abcdefg")
           req.user = await User.findById(decode.id).select("-password")
           next()
        }
    }catch (err){
        res.status(401)   
        res.send("not auth")
    }
if (!token){
    res.status(403)   
        res.send("forbid")
}
}

module.exports = {authApi}