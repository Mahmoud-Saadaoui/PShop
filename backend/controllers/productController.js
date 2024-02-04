import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * desc   Fetch All Products
 * route  Get /api/products
 * access Public
 */
const getProducts = asyncHandler( async(req, res) => {
    const products = await Product.find({})
    res.json(products)
});

/**
 * desc   Fetch Product By Id
 * route  Get /api/products/id
 * access Public
 */
const getProductById = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (condition) {
       res.json(product) 
    }
    
    res.status(400)
    throw new Error('Resource not found')
});

export {
    getProducts,
    getProductById
}