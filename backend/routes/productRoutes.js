import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  updateProductImage,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import { upload } from '../middleware/upload.js';

router.route('/').get(getProducts).post(protect, admin, upload.single("image"), createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/image').put(protect, admin, checkObjectId, upload.single("image"), updateProductImage);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;