const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


const wishlistNotiSchema = mongoose.Schema({
    userId: String,
     items: Array    //productID,status
    // color: String,
    // size: String
});

module.exports = mongoose.model('WishlistNoti',wishlistNotiSchema);