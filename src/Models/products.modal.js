const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


const productsSchema = mongoose.Schema({
    itemName : String,
    category : String,
    description : String,
    image: String,
    price: Number,
    promo: Number,
    category: Number,
    createdDate: {
        type: Date,
        default: Date.now,
    },
    createdBy : String,
});

module.exports = mongoose.model('Products',productsSchema);
