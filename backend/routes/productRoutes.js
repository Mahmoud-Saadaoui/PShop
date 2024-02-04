import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
const router = express.Router();

router.get('/', asyncHandler (async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}));

router.get('/:id', asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (condition) {
       res.json(product) 
    }
    
    res.status(400).json({ msg: 'Product Not Found' })
}));

export default router;