const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


const productDetailsSchema = mongoose.Schema({
    productId: ObjectId,
    intrestBY: Array,
    purchasedBy: Array,
    status: Boolean,
    quantity: Number,
    // color: String,
    // size: String
});

module.exports = mongoose.model('ProductDetails',productDetailsSchema);
