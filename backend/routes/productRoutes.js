import express from 'express';
import { createProduct, getProductById, getProducts } from '../controllers/productController.js';
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct);

// /api/products/id
router.get('/:id', getProductById);

export default router;