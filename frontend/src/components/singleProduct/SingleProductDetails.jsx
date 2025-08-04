import React, { useState } from "react";
import Rating from "../products/Rating";
import { FaCartPlus } from "react-icons/fa";
import { IoAdd, IoRemove } from "react-icons/io5";

const SingleProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.countInStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const isOutOfStock = quantity > product?.countInStock;
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {product.category}
      </p>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <span className="text-xl font-bold text-[#53CCD7]">
          ${product.price}
        </span>
      </div>
      <hr className="border border-gray-200" />
      <p className="text-gray-700 leading-relaxed">{product.description}</p>
      <hr className="border border-gray-200" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={`https://logo.clearbit.com/${product.brand}.com`}
            alt={product.brand}
            className="h-8"
          />
        </div>
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          className="text-md"
        />
      </div>
      <hr className="border border-gray-200" />
      <div className="space-y-1 ">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || product.countInStock == 0}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          >
            <IoRemove />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1) setQuantity(val);
            }}
            min="1"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <button
            onClick={handleIncrease}
            disabled={
              quantity >= product.countInStock || product.countInStock == 0
            }
            className={`p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40`}
          >
            <IoAdd />
          </button>
        </div>
      </div>
      <hr className="border border-gray-200" />
      <div className="flex items-center justify-between gap-4">
        <button
          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-lg text-white font-bold py-2 px-6 rounded-sm"
          disabled={isOutOfStock || product.countInStock == 0}
        >
          <FaCartPlus />
          <span>Add to Cart</span>
        </button>
        <span
          className={`text-sm font-medium ${
            product.countInStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

export default SingleProductDetails;