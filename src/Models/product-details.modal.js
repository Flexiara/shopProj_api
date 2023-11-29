const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


const productDetailsSchema = mongoose.Schema({
    productId: ObjectId,
    intrestBY: Array,
    purchasedBy: Array,
    status: Boolean,
    quantity: Number,
    promoPrice: Number,
    promoDescription: String,
    startDate: Date,
    endDate: Date
    // color: String,
    // size: String
});

module.exports = mongoose.model('ProductDetails',productDetailsSchema);
