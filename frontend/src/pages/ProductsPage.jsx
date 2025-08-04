import { useCallback, useEffect, useState } from "react";
import { IoFilter, IoClose, IoAlertCircleOutline  } from "react-icons/io5";
import FormFilters from "../components/products/FormFilters";
import { useFetchProducts, useGetPricesRange } from "../lib/queries/productsQueries";
import Alert from "../components/Alert";
import Skeleton from "../components/loaders/Skeleton";
import Pagination from "../components/products/Pagination";
import ProductCard from "../components/products/ProductCard";
import Search from "../components/products/Search";
import NoProductsFound from "../components/products/NoProductsFound";

const ProductsPage = () => {
  const [filters, setFilters] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
    data: pricesRange,
    isPending: isPricesRangePending,
    error: pricesRangeError,
    isError: isPricesRangeError,
  } = useGetPricesRange();
  
  useEffect(() => {
    if (pricesRange && !filters) {
      setFilters({
        pageNumber: 1,
        keyword: "",
        category: [],
        minPrice: pricesRange.minPrice,
        maxPrice: pricesRange.maxPrice,
        sort: "",
      });
    }
  }, [pricesRange, filters]);
  const {
    data,
    isPending: isProductsPending,
    isError: isProductsError,
    error: productsError,
  } = useFetchProducts(filters);

  /**
   * -------------------------------------------
   * Search Products
   * -------------------------------------------
  */
  const handleSearchProducts = useCallback((text) => {
    setFilters((prev) => ({
      ...prev,
      keyword: text.trim(),
      pageNumber: 1,
    }));
  }, []);
  /**
   * -------------------------------------------
   * Pagination
   * -------------------------------------------
  */
  const handlePageChange = useCallback((newPage) => {
    setFilters((prev) => ({ ...prev, pageNumber: newPage }));
  }, []);
  /**
   * -------------------------------------------
   * Reset Filters
   * -------------------------------------------
  */
  const resetFilters = useCallback(() => {
    setFilters({
      pageNumber: 1,
      keyword: "",
      category: [],
      minPrice: pricesRange.minPrice,
      maxPrice: pricesRange.maxPrice,
      sort: "",
    });
  }, [pricesRange]);
  /** ------------------------------------------
   * Loading
  ------------------------------------------- */
  if (isPricesRangePending || !filters) return <Skeleton />;
  if (isPricesRangeError) return <Alert message={pricesRangeError.message} type="error" />;
  if (isProductsPending) return <Skeleton />;

  return (
    <div className="w-full bg-white text-gray-800 my-5 px-3">
      {isProductsError && (
        <Alert message={productsError.message} type="error" />
      )}
      <div className="max-w-7xl mx-auto">
        <div className="md:flex">
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-opacity-30 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
              ></div>

              <div className="relative bg-white w-3/4 max-w-sm h-full shadow-xl animate-slide-in-left">
                <button
                  className="absolute top-3 right-4 text-2xl text-gray-600"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <IoClose />
                </button>
                {/* -------------------------------------------
                  Filters for Mobile
                ------------------------------------------- */}
                <FormFilters
                  formClassName="p-4 space-y-6 mt-7"
                  defaultValues={filters}
                  onApplyFilters={(newFilters) => setFilters(newFilters)}
                  pricesRange={pricesRange}
                />
              </div>
            </div>
          )}
          {/* -------------------------------------------
            Desktop Filters
          ------------------------------------------- */}
          <FormFilters
            formClassName="hidden md:block md:w-1/4 space-y-6"
            defaultValues={filters}
            onApplyFilters={(newFilters) => setFilters(newFilters)}
            pricesRange={pricesRange}
          />
          <div className="md:w-3/4 md:pl-8 mx-auto">
            {/* ------------------------------------------ 
              Products Searching (Mobile & Desktop)
            ------------------------------------------- */}
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center text-white bg-[#F8AD47] font-semibold p-3 rounded-md cursor-pointer"
                >
                  <IoFilter size={20} />
                </button>
              </div>
              <Search onSearch={handleSearchProducts}/>
            </div>
            {/* ------------------------------------------ 
              Display Products
            ------------------------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products?.length > 0 ? (
              data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <NoProductsFound onClearFilters={() => resetFilters()} />
            )}
            </div>
            {/* -------------------------------------------
              Pagination
            ------------------------------------------- */}
            {data?.page && parseInt(data?.pages) > 1 && (
              <Pagination
                currentPage={data?.page}
                totalPages={data?.pages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;