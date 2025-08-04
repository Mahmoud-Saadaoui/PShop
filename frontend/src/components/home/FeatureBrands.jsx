import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Rating from "../products/Rating";
import { useGetProductsGroupedByFeaturesBrands } from "../../lib/queries/productsQueries";
import Alert from "../Alert";
import Spinner from "../loaders/Spinner";
import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";

const BrandCard = ({ brand, products }) => {
  const [active, setActive] = useState(0);
  const product = products[active];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-white border-3 border-gray-200 p-4 w-full max-w-2xl">
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* Left Side */}
        <div className="w-full md:w-1/3 flex flex-col items-center space-y-3">
          <img
            src={product.images?.[active]?.secureUrl}
            alt={product.name}
            className="w-full h-44 object-contain rounded"
          />
          <Link
            to={`/products/${product._id}`}
            className="text-[#F8AD47] border-2 border-[#F8AD47] px-3 py-1 text-center text-sm font-semibold hover:bg-[#F8AD47] hover:text-white w-full"
          >
            Discover Product
          </Link>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Title + Price */}
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h4 className="text-md md:text-lg font-semibold truncate max-w-[60%]">
                {product.name}
              </h4>
              <span className="text-md md:text-lg font-bold text-[#53CCD7]">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm line-clamp-3">
              {product.description}
            </p>

            {/* Rating */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              className="text-sm"
            />
          </div>

          {/* Bottom: Logo + Navigation */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Brand:</span>
              <img
                src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                alt={brand}
                className="h-6"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="bg-gray-50 text-gray-400 p-2 border border-gray-200 hover:bg-gray-200"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-50 text-gray-400 p-2 border border-gray-200 hover:bg-gray-200"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureBrands = () => {
  const { data, isPending, isError, error } =
    useGetProductsGroupedByFeaturesBrands();

  if (isPending) return <Spinner />;
  if (isError)
    return (
      <Alert
        message={
          error.message || "Fetching Products By Features Brands Is Failed"
        }
        type="error"
      />
    );
  return (
    <section className="py-12 px-4 lg:px-8 bg-gray-50 mx-auto">
      <SectionHeader
        title="Discover Our Best-Selling Brands"
        description="Browse top products from the most popular brands. Each card shows a featured item with rating, price, and a quick look link."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 max-w-6xl mx-auto">
        {data.map((brandData) => (
          <BrandCard
            key={brandData.brand}
            brand={brandData.brand}
            products={brandData.products}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureBrands;