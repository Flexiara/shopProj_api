const mongoose = require("mongoose");



const registerSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    address : String,
    phone : Number,
    email : String,
    password :String,

});

module.exports = mongoose.model('User',registerSchema);