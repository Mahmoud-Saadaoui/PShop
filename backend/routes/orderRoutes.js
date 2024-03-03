import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// /api/orders
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.get("/mine", protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/paid").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
