import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text, className }) => {
  return (
    <div className={`${className} mt-2 flex items-center space-x-0.5`}>
      <span>
        {value >= 1 ? (
          <FaStar className="fa-solid fa-star text-yellow-400 "></FaStar>
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-yellow-500 "></FaStarHalfAlt>
        ) : (
          <FaStar className="fa-regular fa-star text-neutral-200 "></FaStar>
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="fa-solid fa-star text-yellow-400 "></FaStar>
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-yellow-500 "></FaStarHalfAlt>
        ) : (
          <FaStar className="fa-regular fa-star text-neutral-200 "></FaStar>
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="fa-solid fa-star text-yellow-400 "></FaStar>
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-yellow-500 "></FaStarHalfAlt>
        ) : (
          <FaStar className="fa-regular fa-star text-neutral-200 "></FaStar>
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="fa-solid fa-star text-yellow-400 "></FaStar>
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-yellow-500 "></FaStarHalfAlt>
        ) : (
          <FaStar className="fa-regular fa-star text-neutral-200 "></FaStar>
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="fa-solid fa-star text-yellow-400 "></FaStar>
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="fa-regular fa-star-half-stroke text-yellow-500 "></FaStarHalfAlt>
        ) : (
          <FaStar className="fa-regular fa-star text-neutral-200 "></FaStar>
        )}
      </span>
      <span className="pl-2 font-semibold">{text > 0 && text}</span>
    </div>
  );
};

export default Rating;
