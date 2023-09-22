const User = require("../Models/user.modal")
const bcrypt = require ("bcrypt")
const saltRounds = 10; // Adjust the number of rounds as needed

const loginAcc = async (req, res, next) => {
    console.log(req.body)
    email = req.body.email
    password = req.body.password
    try {
        result = await User.findOne({ email: email })
        if (result) {
            passwordPass = bcrypt.compareSync(password, result.password)
            console.log(passwordPass);
            if (passwordPass) {
                res.json(result)
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
    try {
        const data = new User(req.body) 
        existEmail = await User.findOne({ email: data.email })
        if (!existEmail) {
            const hashPassword = bcrypt.hashSync(data.password, saltRounds);
            data.password = hashPassword
            const result = await data.save()
            res.json("Success")
        } else {
            throw ("Email Aleady Used!")
        }     
    }
    catch (err) {
        next(err)
    }
}

const logHome =  (req, res, next) => {
    try {
console.log("asdasda");
res.status(200).send("yessss")

    }
    catch(err) {
        next(err)
    }
}
const logNoHome =  (req, res, next) => {
    try {
console.log("noooooo");
res.status(200).send("nooooo")
    }
    catch(err) {
        next(err)
    }
}



module.exports = {
    registerAcc, loginAcc, logHome ,logNoHome
}