import express from "express";
import {
  authUser,
  deleteUser,
  getAuthenticatedUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
  verifyAccount,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// /api/users
router.route("/").get(protect, admin, getUsers);
router.post('/register', registerUser)
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.get("/me", protect, getAuthenticatedUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

router.route("/:userId/verify/:token").get(verifyAccount)

export default router;
