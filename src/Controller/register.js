const User = require("../Models/user.modal")
const bcrypt = require ("bcrypt")
const saltRounds = 10; // Adjust the number of rounds as needed
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const jwt = require ("jsonwebtoken");
const wishlistNotiModal = require("../Models/wishlist-noti.modal");

const loginAcc = async (req, res, next) => {

    email = req.body.email
    password = req.body.password
    try {
        result = await User.findOne({ email: email })
        if (result) {
            passwordPass = bcrypt.compareSync(password, result.password)
            if (passwordPass) {
                const token = createToken(result._id)
             
                res.json({
                    _id: result._id,
                    avator: result.avator,
                    token: token,
                    firstName: result.firstName

                })
            } else {
                res.status(400).send("Wrong Password")
            }
        } else {
            res.status(400).send("Invalid Email")
        }
    }
    catch (err) {
        next(err)
    }
}

const registerAcc = async (req, res, next) => { 
    let imageurl= ""
    try { 
        const  userDetails = JSON.parse(req.body.data);

        existEmail = await User.findOne({ email: userDetails.email })
        if (!existEmail) { 
            const hashPassword = bcrypt.hashSync(userDetails.password, saltRounds);
            userDetails.password = hashPassword
            const imageData = JSON.parse(req.body?.image);

            if(imageData.base64){
                // const imageData = JSON.parse(req.body.image);
                const base64ImageData = imageData; 
                const originalFilename = userDetails.fileName;           
                const uploadDirectory = path.join(__dirname, "..","..","upload","avators");
                const imageBuffer = Buffer.from(base64ImageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
                if (!fs.existsSync(uploadDirectory)) {
                    fs.mkdirSync(uploadDirectory);
                }
                var imagePath = path.join(uploadDirectory, `${originalFilename}`);
                fs.writeFileSync(imagePath, imageBuffer);
                imageurl =  `/avator/${originalFilename}`
                userDetails.avator =  imageurl
            }
            
            const data = new User(userDetails);
            const result = await data.save();
            const userId = result._id
             await  wishlistNotiModal.create({userId})
            res.json(result)
        } else {
            throw ("Email Aleady Used!")
        }     
    }
    catch (err) {
        next(err)
    }
}

const getUserDetails = async (req, res, next) => {
   const userId = req.query.id
 try{
   result = await User.findOne({_id: new ObjectId(userId)})
   res.json(result)
 }
 catch (err) {
    next(err)
 }
}

const createToken = (id) => {
    return jwt.sign({id}, "abcdefg")
}

module.exports = {
    registerAcc, loginAcc, getUserDetails
}