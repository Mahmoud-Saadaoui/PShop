import { objectToSearchParams } from "../../helpers/urlParamsHelpers";
import summaryApi from "../../utils/urls";
import axios from "axios";

// Fetch Categories
export const fetchCategories = async() => {
  try {
    const res = await axios.get(summaryApi.products.fetchCategories)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// Fetch Products
export const fetchProducts = async (params) => {
  const query = objectToSearchParams(params);

  const res = await fetch(`${summaryApi.products.fetchProducts}?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Get Max & Min Products Prices
export const getPricesRange = async() => {
  try {
    const res = await axios.get(summaryApi.products.getPricesRange)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// Fetch Brands
export const fetchBrands = async() => {
  try {
    const res = await axios.get(summaryApi.products.fetchBrands)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// Get Single Product By Id
export const getProductById = async(id) => {
  try {
    const res = await axios.get(summaryApi.products.getProductById(id))
    return res.data
  } catch (error) {
    console.error(error)
  }
}