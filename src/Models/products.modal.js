const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


const productsSchema = mongoose.Schema({
    itemName : String,
    category : String,
    itemDetails : String,
    createdDate: {
        type: Date,
        default: Date.now,
    },
    createdBy : ObjectId,
    rank : Number,
});

module.exports = mongoose.model('Products',productsSchema);