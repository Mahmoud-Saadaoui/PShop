import asyncHandler from "../middlewares/asyncHandler.js";
import Banner from "../models/bannerModel.js";
import { cloudinaryRemoveImage, uploadSingleImageToCloudinary } from "../utils/cloudinaryHelpers.js";
import { validateRequiredFields } from "../utils/helpers.js";

/**
 * desc   Read Banners (admin)
 * route  GET /api/banner
 * access Public
*/
export const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({})
  res.status(201).json( banners )
});


/**
 * desc   Create New Banner (admin)
 * route  POST /api/banner
 * access Private|admin
*/
export const createBanner = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access Denied! Only admin." })
  }

  // Validate required fields
  const requiredFields = ["title", "description"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }

  const image = req.file
  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  // Upload image to Cloudinary
  const uploadResponse = await uploadSingleImageToCloudinary(image)

  // Save the new banner in database
  const banner = await Banner.create({
    user: req.user._id,
    title: req.body.title,
    description: req.body.description,
    image: {
      secureUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    }
  })

  res.status(201).json({ message: "New banner created successfully", banner })
});

/**
 * desc   Read Banner By Id (admin)
 * route  GET /api/banner/:id
 * access Private|admin
*/
export const getSingleBanner = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access Denied! Only admin." })
  }

  const id = req.params.id
  const banner = await Banner.findById( id )
  if (!banner) {
    return res.status(400).json({ massage: "Banner not found" })
  }
  
  res.status(201).json( banner )
});

/**
 * desc   Update Banner Image (admin)
 * route  PUT /api/banner/:id/image
 * access Private|admin
*/
export const updateSingleBannerImage = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access Denied! Only admin." });
  }

  const id = req.params.id;
  const banner = await Banner.findById(id);
  if (!banner) {
    return res.status(400).json({ massage: "Banner not found" });
  }

  const image = req.file;
  if (!image) {
    return res.status(400).json({ massage: "No image provided" });
  }

  // Delete Old Image from Cloudinary
  await cloudinaryRemoveImage(banner.image.publicId);

  // Upload new Image
  const uploadResponse = await uploadSingleImageToCloudinary(image)

  // Update Image Field in DB
  const updatedBanner = await Banner.findByIdAndUpdate(
    id,
    {
      $set: {
        image: {
          secureUrl: uploadResponse.secure_url,
          publicId: uploadResponse.public_id,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    updatedBanner,
    message: "Image updated successfully",
  });
});

/**
 * desc   Update Banner Data (admin)
 * route  PUT /api/banner/:id/data
 * access Private|admin
*/
export const updateSingleBannerData = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access Denied! Only admin." });
  }

  // Validate required fields
  const requiredFields = ["title", "description"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }

  const id = req.params.id;
  const banner = await Banner.findById(id);
  if (!banner) {
    return res.status(400).json({ massage: "Banner not found" });
  }

  // Update Banner data
  const updateBdBanner = await Banner.findByIdAndUpdate(id, {
    $set: {
        title: req.body.title,
        description: req.body.description,
    }
  }, { new: true })

  res.status(200).json({
    updateBdBanner,
    message: "Banner data updated successfully",
  });
});

/**
 * desc   Delete Banner (admin)
 * route  PUT /api/banner/:id
 * access Private|admin
*/
export const removeBanner = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access Denied! Only admin." });
  }
  // Find banner by ID
  const id = req.params.id;
  const banner = await Banner.findById(id);
  if (!banner) {
    return res.status(400).json({ massage: "Banner not found" });
  }
  // Remove banner image from Cloudinary
  await cloudinaryRemoveImage(banner.image.publicId);
  // Delete banner from database
  await Banner.findByIdAndDelete(id);

  res.status(200).json({
    message: "Banner deleted successfully",
  });
});