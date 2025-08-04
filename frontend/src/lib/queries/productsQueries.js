import { getMostRatedProducts, getProductsByFeaturesBrands } from "../api/bannerApi";
import { fetchBrands, fetchCategories, fetchProducts, getPricesRange, getProductById } from "../api/productsApi";
import { useQuery } from "@tanstack/react-query"

// Fetch Categories Mutation
export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 10,
  })
}

// Products Mutation
export const useFetchProducts = (filters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters), 
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });
};

// Get Price Range Mutation
export const useGetPricesRange = () => {
  return useQuery({
    queryKey: ["prices"],
    queryFn: () => getPricesRange(),
    staleTime: 1000 * 60 * 10,
  })
}

// Fetch Brands Mutation
export const useFetchBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
    staleTime: 1000 * 60 * 10,
  })
}

// Fetch Products By Top Rating
export const useFetchTopRatedProducts = () => {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: () => getMostRatedProducts(),
    staleTime: 1000 * 60 * 10,
  })
}

// Fetch Products By Features Brands
export const useGetProductsGroupedByFeaturesBrands = () => {
  return useQuery({
    queryKey: ["features-brands"],
    queryFn: () => getProductsByFeaturesBrands(),
    staleTime: 1000 * 60 * 10,
  })
}

// Get Single Product By Id Mutation
export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id, 
    staleTime: 1000 * 60 * 10
  })
}
