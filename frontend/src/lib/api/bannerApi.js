import summaryApi from "../../utils/urls";
import axios from "axios";

// Fetch Banners
export const fetchBanners = async() => {
  try {
    const res = await axios.get(summaryApi.banners.fetchBanners)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Get Most Rated Products
export const getMostRatedProducts = async() => {
  try {
    const res = await axios.get(summaryApi.products.getMostRatedProducts)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Get Products Grouped By Features Brands
export const getProductsByFeaturesBrands = async() => {
  try {
    const res = await axios.get(summaryApi.products.getProductsGroupedByFeaturesBrands)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}