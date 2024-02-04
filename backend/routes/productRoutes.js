import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';
const router = express.Router();

// /api/products
router.get('/', getProducts);

// /api/products/id
router.get('/:id', getProductById);

export default router;