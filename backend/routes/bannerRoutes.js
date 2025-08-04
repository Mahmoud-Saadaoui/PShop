import express from "express";
import {
  createBanner,
  getBanners,
  getSingleBanner,
  removeBanner,
  updateSingleBannerData,
  updateSingleBannerImage,
} from "../controllers/bannerController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), createBanner);

router.get("/", getBanners);

router.get("/:id", protect, admin, getSingleBanner);

router.delete("/:id", protect, admin, removeBanner);

router.put("/:id/image", protect, admin, upload.single("image"), updateSingleBannerImage);

router.put("/:id/data", protect, admin, updateSingleBannerData);

export default router;
