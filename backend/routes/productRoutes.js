import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// /api/products
router.route("/").get(getProducts).post(protect, admin, createProduct);

// /api/products/id
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
