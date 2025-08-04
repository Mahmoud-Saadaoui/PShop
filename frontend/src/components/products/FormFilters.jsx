import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useFetchCategories } from "../../lib/queries/productsQueries";
import Spinner from "../loaders/Spinner"

const FormFilters = ({ formClassName, defaultValues, onApplyFilters, pricesRange }) => {
  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
  } = useFetchCategories();
  /**
   * ------------------------------------------
   * Constants for Price Range
   * ------------------------------------------
  */
  const minRange = pricesRange?.minPrice;
  const maxRange = pricesRange?.maxPrice;
  const minGap = 10;
  const [draft, setDraft] = useState({
    category: defaultValues.category || [],
    minPrice: defaultValues.minPrice ?? minRange,
    maxPrice: defaultValues.maxPrice ?? maxRange,
    sort: defaultValues.sort || "",
  });

  /**
   * ------------------------------------------
   * Handle Min Max Price Change
   * ------------------------------------------
  */  
  const handleMinChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (draft.maxPrice - value >= minGap) {
      setDraft((prev) => ({ ...prev, minPrice: value }));
    }
  }, [draft.maxPrice]);

  const handleMaxChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (value - draft.minPrice >= minGap) {
      setDraft((prev) => ({ ...prev, maxPrice: value }));
    }
  }, [draft.minPrice]);
  /**
   * ------------------------------------------
   * Track for Price Range
   * ------------------------------------------
  */
  const minPercent = useMemo(() => {
    if (draft.minPrice == null || !minRange || !maxRange) return 0;
    return ((draft.minPrice - minRange) / (maxRange - minRange)) * 100;
  }, [draft.minPrice, minRange, maxRange]);
  
  const maxPercent = useMemo(() => {
    if (draft.maxPrice == null || !minRange || !maxRange) return 0;
    return ((draft.maxPrice - minRange) / (maxRange - minRange)) * 100;
  }, [draft.maxPrice, minRange, maxRange]);
  /**
   * ------------------------------------------
   * Loading Handler
   * ------------------------------------------
  */
  if (isCategoriesPending) return <Spinner />;
  return (
    <>
      {isCategoriesError && <Alert message={categoriesError.message} type="error" />}
      <form className={formClassName}>
        {/* ------------------------------------------
          Filter By Category 
        ------------------------------------------- */}
        <div className="border border-gray-300 p-3">
          <h3 className="border-b border-gray-300 text-base font-semibold text-gray-800 mb-4 pb-2">
            Filter by Category
          </h3>
          {categories?.map((cat, i) => (
            <label
              key={i}
              className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 px-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={draft.category.includes(cat)}
                  onChange={(e) => {
                    setDraft((prev) => ({
                      ...prev,
                      category: e.target.checked
                        ? [...prev.category, cat]
                        : prev.category.filter((c) => c !== cat),
                    }));
                  }}
                />
                <span className="text-gray-700 text-sm">{cat}</span>
              </div>
            </label>
          ))}
        </div>
        {/* ------------------------------------------
          Filter By Price
        ------------------------------------------- */}
        <div className="border border-gray-300 p-3">
          <h3 className="text-base font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Filter By Price
          </h3>
          {/* ------------------------------------------
            Sort by Price
          ------------------------------------------- */}
          <div className="my-5 px-1">
            <select
              id="priceSort"
              value={draft.sort}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, sort: e.target.value }))
              }
              className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition"
            >
              <option disabled value="">
                Sort by Price
              </option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
          {/* ------------------------------------------
            Filter ByPrice Range
          ------------------------------------------- */}
          <div className="flex justify-around text-gray-600 text-sm mb-1.5">
            <span>${draft.minPrice}</span>
            <span>${draft.maxPrice}</span>
          </div>
          {/* ------------------------------------------
            Display Price Range
          ------------------------------------------- */}
          {/* {pricesRange && ( */}
            <div className="relative w-full h-[5px] bg-gray-200 rounded">
              <div
                className="absolute h-full bg-[#F8AD47] rounded-full z-10"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />
              <input
                type="range"
                name="minPrice"
                min={minRange}
                max={maxRange}
                value={draft?.minPrice}
                onChange={handleMinChange}
                className="absolute w-full pointer-events-none appearance-none z-20 bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
              />
              <input
                type="range"
                name="maxPrice"
                min={minRange}
                max={maxRange}
                value={draft.maxPrice}
                onChange={handleMaxChange}
                className="absolute w-full pointer-events-none appearance-none z-20 bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
              />
            </div>
          {/* )} */}
        </div>
        {/* ------------------------------------------
          Apply Filters
        ------------------------------------------- */}
        <button
          type="button"
          className="w-full bg-[#F8AD47] text-white py-2 rounded-md mt-4"
          onClick={() => {
            onApplyFilters({ ...draft, pageNumber: 1 });
          }}
        >
          Apply Filters
        </button>
      </form>
    </>
  );
};

export default React.memo(FormFilters);