
const productDetailsModal = require("../Models/product-details.modal");
const productsModal = require("../Models/products.modal")
const mongoose = require('mongoose');


const getProductsDetail = async (pageNumber) => {
    try {
        const skipNumber =(pageNumber - 1) * 6;
        const result = await productsModal.aggregate([
            {
                $lookup: {
                    from: "productdetails",
                    foreignField: "productId",
                    localField: "_id",
                    as: "result"
                }
            },
            {
                $skip: skipNumber
            },
            {
                $limit: 6
            },
            {
                $addFields: {
                    intrestBY: {
                        $ifNull: [
                            { $arrayElemAt: ["$result.intrestBY", 0] }, []]
                    }
                }
            },
            {
                $project: {
                    "result": 0
                }
            }
        ])
        return result;
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

const addProductToCart = async (userId, productId) => {
try {
    const existData = await productDetailsModal.findOne(  
        {  $and: [
              {productId: new mongoose.Types.ObjectId(productId)},
              {intrestBY : {$elemMatch : { $eq : userId}}}
          ]})
      if (existData) {
          const result = await productDetailsModal.findOneAndUpdate({productId: new mongoose.Types.ObjectId(productId)},{
              $pull: { intrestBY: userId }
           },{new : true })  
           return result
      } else {
        const  result = await productDetailsModal.findOneAndUpdate({productId: new mongoose.Types.ObjectId(productId)},{
              $push: { intrestBY: userId }
           },{new : true })  
           return result
      }
} catch(error){
    console.log(error);
}}

const purchaseItem = async (userId, productId, quantity) => {
    try {
let result =await productDetailsModal.findOneAndUpdate({productId: new mongoose.Types.ObjectId(productId)},
// {$push: { purchasedBy: userId}}, {},{new: true}
{$set : {
    quantity: quantity,
    
}}
)
     return result;
    } catch (error){
        throw (error)
    }
} 






module.exports={addProductToCart, getProductsDetail, purchaseItem}