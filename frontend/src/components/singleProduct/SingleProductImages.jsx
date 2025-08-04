import React, { useState } from "react";

const SingleProductImages = ({ images }) => {
  const [activeProductImage, setActiveProductImage] = useState(0);
  return (
    <div className="relative">
      <div className="aspect-square w-full h-full rounded-xs border border-gray-200 bg-gray-100 p-3">
        <img
          src={images[activeProductImage].secureUrl}
          alt={images[activeProductImage]._id}
          className="w-full h-full"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex gap-2 px-4 py-2">
        {images.map((img, index) => (
          <div
            key={img._id}
            className={`w-16 h-16 border border-gray-400 bg-gray-50 p-1 cursor-pointer object-cover transition-all duration-200 ${
              index === activeProductImage
                ? "ring-2 ring-[#53CCD7] border-transparent"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveProductImage(index)}
          >
            <img
              key={img._id}
              src={img.secureUrl}
              alt={`Preview ${index + 1}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProductImages;