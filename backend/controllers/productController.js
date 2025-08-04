import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { validateRequiredFields } from "../utils/helpers.js";
import { cloudinaryRemoveMultipleImages, uploadMultipleImages } from "../utils/cloudinaryHelpers.js";

/**
 * desc   Fetch All Products
 * route  Get /api/products
 * access Public
*/
const getProducts = asyncHandler(async (req, res) => {
  const limit = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const skip = (page - 1) * limit;

  // Search products by name or description
  const keyword = req.query.keyword?.trim();
  const search = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  // Filter by selected category
  const categoryParam = req.query.category;
  let categoryFilter = {};
  
  if (categoryParam) {
    if (Array.isArray(categoryParam)) {
      categoryFilter = {
        category: {
          $in: categoryParam.map((cat) => new RegExp(`^${cat}$`, "i")),
        },
      };
    } else {
      categoryFilter = {
        category: { $regex: `^${categoryParam}$`, $options: "i" },
      };
    }
  }

  // Filter by price range
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity;
  const priceFilter = {
    price: { $gte: minPrice, $lte: maxPrice },
  };

  // Sort products by price (ascending or descending)
  const sortByPrice =
    req.query.sort === "asc"
      ? { price: 1 }
      : req.query.sort === "desc"
      ? { price: -1 }
      : {};

  // Combine all filters
  const filters = {
    ...search,
    ...categoryFilter,
    ...priceFilter,
  };

  // Count total matching products for pagination
  const productsCount = await Product.countDocuments(filters);

  // Fetch filtered, sorted, and paginated products
  const products = await Product.find(filters)
    .sort(sortByPrice)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(productsCount / limit),
    productsCount,
  });
});

/**
 * desc   Fetch Product By Id
 * route  Get /api/products/id
 * access Public
*/
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
    return;
  }

  res.status(404).json({ message: "Resource not found" });
});

/**
 * desc   Fetch Products Categories
 * route  Get /api/products/categories
 * access Public
*/
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.status(200).json(categories);
});

/**
 * desc   Fetch Products By Brand
 * route  Get /api/products/brands
 * access Public
*/
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Product.distinct('brand');
  res.status(200).json(brands);
});

/**
 * desc   Create a product
 * route  POST /api/products
 * access Private/Admin
*/
const createProduct = asyncHandler(async (req, res) => {
  // Check if a product with the same name already exists
  const findProduct = await Product.findOne({ name: req.body.name.trim() })
  if (findProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }

  // Validate required fields
  const requiredFields = ["name", "brand", "description", "price", "category", "countInStock"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }

  // Upload product images to Cloudinary
  let uploadedImages;
  try {
    uploadedImages = await uploadMultipleImages(req.files);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // Create a new product instance with the provided data
  const product = new Product({
    user: req.user._id,
    name: req.body.name,
    images: uploadedImages,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
  });
  const newProduct = await product.save();

  res.status(201).json({ 
    message: "Product added successfully", 
    newProduct 
  });
});

/**
 * desc   Update Product Data
 * route  PUT /api/products/:id
 * access Private/Admin
*/
const updateProductData = asyncHandler(async (req, res) => {
  // Validate required fields
  const requiredFields = ["name", "brand", "description", "price", "category", "countInStock"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/**
 * desc   Update Product Images
 * route  PUT /api/products/:id/images
 * access Private/Admin
*/
const updateProductImages = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({ message: "Product not found" })
  }
  // Remove old product images from Cloudinary
  const productImages = product.images
  const publicIds = productImages?.map(img => img.publicId)
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImages(publicIds)
  }
  // Upload new images to Cloudinary
  let uploadedImages;
  try {
    uploadedImages = await uploadMultipleImages(req.files);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // Update product in the database with new image references
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: { images: uploadedImages } },
    { new: true }
  );

  res.status(200).json({ 
    message: "Product images are updated successfully.",
    updatedProduct
   })
});

/**
 * desc   Delete Product
 * route  DELETE /api/products/:id
 * access Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  // Remove product images from Cloudinary
  const productImages = product.images
  const publicIds = productImages?.map(img => img.publicId)
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImages(publicIds)
  }

  // Remove product from db
  await Product.deleteOne({ _id: product._id })

  res.status(200).json({ message: "Product removed successfully" })
});

/**
 * desc   Create Product Review
 * route  POST /api/products/:id/review
 * access Private
*/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/**
 * desc   Get Prices Range
 * route  POST /api/products/prices
 * access Public
*/
const getPriceRange = asyncHandler(async (req, res) => {
  const prices = await Product.distinct('price');

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  res.status(200).json({ minPrice, maxPrice }); 
});

/**
 * desc   Get top-rated and featured brand products for homepage.
 * route  Get /api/products/top-rated
 * access Public
*/
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const mostRatedProducts = await Product.find()
  .sort({ rating: -1, createdAt: -1 }) 
  .limit(6);

  res
    .status(200)
    .json(mostRatedProducts);
});

/**
 * desc   Get products grouped by  features brands.
 * route  Get /api/products/features-brands
 * access Public
*/
const getFeaturedBrands = asyncHandler(async (req, res) => {
  // 1. Aggregate top 4 popular brands based on average rating and number of products
  const popularBrandsStats = await Product.aggregate([
    {
      $group: {
        _id: "$brand",
        averageRating: { $avg: "$rating" },
        totalProducts: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1, totalProducts: -1 } },
    { $limit: 4 },
  ]);

  // 2. Extract brand names from aggregation result
  const popularBrandNames = popularBrandsStats.map((item) => item._id);

  // 3. For each popular brand, fetch a few top-rated products (e.g., 4 products)
  const productsGroupedByBrand = await Promise.all(
    popularBrandNames.map(async (brandName) => {
      const products = await Product.find({ brand: brandName })
        .sort({ rating: -1, createdAt: -1 })
        .limit(4);

      return {
        brand: brandName,
        products,
      };
    })
  );

  res
    .status(200)
    .json(productsGroupedByBrand);
});

export {
  getProducts,
  getTopRatedProducts,
  getFeaturedBrands,
  getProductById,
  createProduct,
  updateProductData,
  deleteProduct,
  createProductReview,
  updateProductImages,
  getCategories,
  getBrands,
  getPriceRange,
};
