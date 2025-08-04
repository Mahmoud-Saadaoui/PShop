import React from "react";
import { FaCartPlus, FaArrowRight  } from "react-icons/fa";
import Rating from "./Rating";
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div className="relative border border-gray-300 rounded-sm p-2">
      <div className="relative group">
        <img
          src={product?.images[0].secureUrl}
          alt={`Product ${product._id}`}
          className="w-full h-60 bg-gray-100 object-contain"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#53CCD7] opacity-0 group-hover:opacity-60 transition duration-300 pointer-events-none" />
          <button className="relative z-10 opacity-0 group-hover:opacity-100 transition duration-300 bg-white text-[#53CCD7] px-5 py-2 text-sm font-bold rounded shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-2">
            <FaCartPlus />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      <Link
        to={`/products/${product._id}`}
        className="block transform transition duration-200 hover:scale-[1.02] mt-2"
      >
        <div className="px-1 pt-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{product.name}</h4>
            <span className="text-[#53CCD7] font-bold">${product.price}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <Rating
              text={product.numReviews}
              value={product.rating}
              className="text-md"
            />
            <FaArrowRight className="text-[#53CCD7]" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProductCard);
