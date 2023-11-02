const mongoose = require("mongoose");



const registerSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    address : String,
    phone : Number,
    email : String,
    password :String,
    avator: String
});

module.exports = mongoose.model('User',registerSchema);