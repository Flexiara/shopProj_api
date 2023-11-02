const Products = require("../Models/products.modal");



const getProducts = async (req, res, next) => {
const result = await Products.find({category:"0123"})
res.json(result)
}
const addProducts = async (req, res, next) => {

    const products = req.body
    const data = new Products(products)
    const result = await data.save()
    console.log(products);
    res.json(result)
}




module.exports = { getProducts, addProducts }