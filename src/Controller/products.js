const Products = require("../Models/products.modal");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const productService = require("../Service/product.service");
const productDetailsModal = require("../Models/product-details.modal");
const wishlistNotiModal = require("../Models/wishlist-noti.modal");
const mongoose = require('mongoose');


const getProducts = async (req, res, next) => {
    try {
        const pageNumber = req.query.pageNumber
        const result = await productService.getProductsDetail(pageNumber)
        setTimeout(() => {
            res.json(result)
        },3000)
        
    } catch(error) {
        next(error)
    }
 
}

const addProducts = async (req, res, next) => {
    let imageurl = ""
    try { 
        const userId = req.query.id
        const productDetails = JSON.parse(req.body.data);
        const imageData = JSON.parse(req.body.image);
        if (imageData.base64 !== "") {
            const imageData = JSON.parse(req.body.image);
            const base64ImageData = imageData;
            const originalFilename = productDetails.fileName;
            const uploadDirectory = path.join(__dirname, "..", "..", "upload", "products");
            const imageBuffer = Buffer.from(base64ImageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory);
            }
            var imagePath = path.join(uploadDirectory, `${originalFilename}`);
            fs.writeFileSync(imagePath, imageBuffer);
            imageurl = `/products/${originalFilename}`
            productDetails.image = imageurl
        }
           productDetails.createdBy = userId
           
        const data = new Products(productDetails);
        const result = await data.save();
        productDetails.productId = result._id
        productDetails.intrestBY = "655c64523476418c4097af07"
        productDetails.promoPrice = result.price - (result.promo*result.price/100)
        const dataForDetail = new productDetailsModal(productDetails)
        const resultForDetail = await dataForDetail.save();
        if(resultForDetail.promo && resultForDetail.promo !== 0 && resultForDetail.promo !== '') {
         const userForWish = resultForDetail.intrestBY
         
        }
        res.json(resultForDetail)
    }
    catch (err) {
        next(err)
    }
}

const addProductToCart= async (req, res ,next) => {
    const {userId, productId} = req.query
  try{ 
      const result = await productService.addProductToCart(userId, productId)
     console.log(result);
      res.send(result)
    } catch(error){
      next(error)
    }
}

const purchaseProducts = async (req, res, next) => {
    const { userId, productId } = req.query
    try {
        const result = await productService.purchaseItem(userId, productId, quantity)
        console.log(result);
        res.send(result)
    } catch (error) {
        next(error)
    }
}

const sampleAdd = async (req, res, next) => { 

  try{
res.send("gggggg")
  } catch(error) {

  }

    
}

const editProducts = async (req, res, next) => {
    // let imageurl = ""
    try { 
        // const userId = req.query.id
        // const productDetails = JSON.parse(req.body.data);

        // const imageData = JSON.parse(req.body.image);
        // if (imageData.base64 !== "") {
        //     const imageData = JSON.parse(req.body.image);
        //     const base64ImageData = imageData;
        //     const originalFilename = productDetails.fileName;
        //     const uploadDirectory = path.join(__dirname, "..", "..", "upload", "products");
        //     const imageBuffer = Buffer.from(base64ImageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
        //     if (!fs.existsSync(uploadDirectory)) {
        //         fs.mkdirSync(uploadDirectory);
        //     }
        //     var imagePath = path.join(uploadDirectory, `${originalFilename}`);
        //     fs.writeFileSync(imagePath, imageBuffer);
        //     imageurl = `/products/${originalFilename}`
        //     productDetails.image = imageurl
        // }
        //    productDetails.createdBy = userId
           
        // const data = new Products(productDetails);
        // const result = await data.save();
        // productDetails.productId = result._id
        // productDetails.intrestBY = "655c64523476418c4097af07"
        // productDetails.promoPrice = result.price - (result.promo*result.price/100)
        // const dataForDetail = new productDetailsModal(productDetails)
        // const resultForDetail = await dataForDetail.save();
        // if(resultForDetail.promo && resultForDetail.promo !== 0 && resultForDetail.promo !== '') {
        //  const userForWish = resultForDetail.intrestBY
         
        // }
        // res.json(resultForDetail)
        const data = await productDetailsModal.find({productId: new mongoose.Types.ObjectId("654c9a1f74de5966df7fb150")})
            const userList = data[0].intrestBY
            console.log( userList);
            const result = await wishlistNotiModal.updateMany({userId : {$in : userList}}, {$push: { items : { $each : [{data: 12, reer: 12}] }}}, { upsert: true })
            console.log(result);
    }
    catch (err) {
        next(err)
    }
}

const removeProducts = async (req, res, next) => {

}

module.exports = { getProducts, addProducts , sampleAdd, addProductToCart, purchaseProducts, editProducts, removeProducts}