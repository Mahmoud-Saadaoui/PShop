function sanitizeDomain(domain) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const prodDomain = sanitizeDomain(import.meta.env.VITE_API_PRODUCTION_URL);
const devDomain = sanitizeDomain(import.meta.env.VITE_API_DEVELOPMENT_URL);

const api_url = `${import.meta.env.MODE === "production" ? prodDomain : devDomain}`;

const summaryApi = {
  auth: {
    login: `${api_url}/api/users/login`,
    register: `${api_url}/api/users/register`,
  },
  products: {
    fetchProducts: `${api_url}/api/products`,
    fetchCategories: `${api_url}/api/products/categories`,
    fetchBrands: `${api_url}/api/products/brands`,
    getPricesRange: `${api_url}/api/products/prices`,
    getProductsGroupedByFeaturesBrands: `${api_url}/api/products/features-brands`,
    getMostRatedProducts: `${api_url}/api/products/top-rated`,
    getProductById: (id) => `${api_url}/api/products/${id}`,
  },
  banners: {
    fetchBanners: `${api_url}/api/banner`
  } 
}

export default summaryApi