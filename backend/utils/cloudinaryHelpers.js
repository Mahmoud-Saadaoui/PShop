import cloudinary from "../config/cloudinary.js";

// Upload single image to Cloudinary from buffers (Multer)
export const uploadSingleImageToCloudinary = async (image, folder = "EShopty") => {
  const base64 = image.buffer.toString("base64");
  const mimeType = image.mimetype;

  const uploadResponse = await cloudinary.uploader.upload(
    `data:${mimeType};base64,${base64}`,
    {
      folder,
      secure: true,
      rejectUnauthorized: false,
    }
  );

  return uploadResponse;
};

// Upload multiple images to Cloudinary from buffers (Multer)
export const uploadMultipleImages = async (files, folderName = "EShopty") => {
  if (!files || files.length === 0) {
    throw new Error("No images provided");
  }

  const uploadedImages = [];

  for (let file of files) {
    const base64 = file.buffer.toString("base64");
    const mimeType = file.mimetype;

    const result = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64}`,
      {
        folder: folderName,
        secure: true,
        rejectUnauthorized: false,
      }
    );

    uploadedImages.push({
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });
  }

  return uploadedImages;
};

// Cloudinary Remove Multiple Images
export const cloudinaryRemoveMultipleImages = async(publicIds ) => {
  try {
      const result = await cloudinary.api.delete_resources(publicIds)
      return result
  } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error (cloudinary)')
  }
}

// Cloudinary Remove Single Image
export const cloudinaryRemoveImage = async(imagePublicId ) => {
  try {
      const result = await cloudinary.uploader.destroy(imagePublicId)
      return result
  } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error (cloudinary)')
  }
}