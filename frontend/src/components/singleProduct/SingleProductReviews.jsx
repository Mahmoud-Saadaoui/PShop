import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import Rating from "../products/Rating";

const SingleProductReviews = ({ reviews }) => {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");
  return (
    <section className="container mt-4 mx-auto px-6 pb-8 text-gray-800">
      <div className="mb-2 border-b border-gray-200">
        <nav className="flex gap-6 text-md font-medium">
          <button
            className={`px-5 pt-2 pb-2.5 transition-colors ${
              activeTab === "reviews"
                ? "border-t border-l border-r border-gray-300 bg-gray-50 text-[#53CCD7] -mb-[1px] rounded-t-xs"
                : "border-b border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            What do they say
          </button>
          <button
            className={`px-5 pt-2 pb-2.5 transition-colors ${
              activeTab === "addReview"
                ? "border-t border-l border-r border-gray-300 bg-gray-50 text-[#53CCD7] -mb-[1px] rounded-t-xs"
                : "border-b border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("addReview")}
          >
            Leave a review
          </button>
        </nav>
      </div>

      {/* Contenu Onglet */}
      {activeTab === "reviews" && (
        <div>
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-2">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className={`px-4 py-2 ${index % 2 != 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-gray-700">
                      {review.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Rating value={review.rating} text="" className="text-sm" />
                  <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "addReview" && (
        <div className="pb-16">
          <div className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Ajouter l'action ici
              }}
              className="space-y-4"
            >
              {/* Star rating */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Your Rating:</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((star, i) => {
                    i += 1;
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="rating"
                          value={i}
                          className="hidden"
                          onClick={() => setRate(i)}
                        />
                        <BsFillStarFill
                          size={20}
                          color={rate >= i ? "#FACC15" : "#E5E7EB"}
                          className="cursor-pointer transition-colors"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Comment */}
              <textarea
                rows="4"
                placeholder="Write your comment..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 resize-none shadow-sm text-sm"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              {/* Submit button */}
              <button
                type="submit"
                className={`font-bold py-2 px-6 rounded-md transition-colors ${
                  rate === 0 || comment.trim() === ""
                    ? "bg-yellow-500 text-white opacity-40 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}                
                disabled={rate === 0 || comment.trim() === ""}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProductReviews;
