import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getBrands,
  getCategories,
  getFeaturedBrands,
  getPriceRange,
  getProductById,
  getProducts,
  getTopRatedProducts,
  updateProductData,
  updateProductImages,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

// /api/products
router.post("/", protect, admin, upload.array('image', 4), createProduct)
router.get('/', getProducts )

//  /api/products/categories
router.route("/categories").get(getCategories)

//  /api/products/brands
router.route("/brands").get(getBrands)

//  /api/products/prices
router.route("/prices").get(getPriceRange)

//  /api/products/top-rated
router.route("/top-rated").get(getTopRatedProducts)

//  /api/products/featured-brands
router.route("/features-brands").get(getFeaturedBrands)

// /api/products/id
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProductData)
  .delete(protect, admin, deleteProduct);

// /api/products/id/images
router.put('/:id/images', protect, admin, upload.array('image', 4), updateProductImages)

//  /api/products/:id/review
router.route("/:id/review").post(protect, createProductReview)

export default router;
