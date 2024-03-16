import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

function ProductScreen() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setComment('')
      setRating(0)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"text-red-700 bg-red-200"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="mt-16 md:mt-28">
          <Link
            to="/"
            className="bg-gray-300 p-2 text-center mx-2 rounded-md hover:bg-gray-600 hover:text-gray-50 duration-200"
          >
            Go Back
          </Link>
          <div className="flex flex-col md:mt-6 lg:flex-row lg:ml-2">
            <img
              src={product.image}
              alt={product.brand}
              className="w-full my-4 mx-auto sm:w-11/12 md:w-9/12 lg:w-4/12"
            />

            <div className="lg:flex lg:flex-col lg:mx-4">
              <div className="flex flex-col border-b-2 border-zinc-400 p-2 md:flex-row md:items-center md:justify-around lg:flex-col lg:items-start">
                <h2 className="text-zinc-500 font-bold ml-2 ">
                  {product.name}
                </h2>
                <p className="text-zinc-700 font-bold ml-2 mt-2 md:my-auto">
                  $ {product.price}
                </p>
              </div>

              <div className="flex flex-col border-b-2 border-zinc-400 p-2 md:flex-row lg:flex-col ">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  className="text-[15px] p-4 border-b-2 border-zinc-400 md:border-r-[1px] md:border-b-0 md:w-2/6 lg:border-r-0 lg:border-b-2 lg:w-full"
                />
                <p className="p-4 text-left md:w-4/6">{product.description}</p>
              </div>
            </div>

            {/* ---- Table ----- */}
            <div className="border border-gray-500 shadow-md rounded-lg mx-auto my-6 w-11/12 sm:w-9/12 lg:mx-4 lg:w-6/12">
              <table className="w-full text-md leading-5">
                <tbody>
                  <tr>
                    <td className="py-3 px-4 text-left font-medium text-gray-600">
                      Price
                    </td>
                    <td className="py-3 px-4 text-left">$ {product.price}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="py-3 px-4 text-left font-medium text-gray-600">
                      Status
                    </td>
                    <td className="py-3 px-4 text-left">
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </td>
                  </tr>
                  {product.countInStock > 0 && (
                    <tr>
                      <td className="py-3 px-4 text-left font-medium text-gray-600">
                        Qty
                      </td>
                      <td className="py-3 px-4 text-left">
                        <div>
                          <select
                            className="border-2 border-zinc-500 w-28 rounded-md focus:outline-0 p-[3px] pl-2 appearance-none bg-none"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option
                                  key={x + 1}
                                  value={x + 1}
                                  className="overflow-auto"
                                >
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className="border border-t-gray-500">
                    <td className="py-3 px-4 w-full ">
                      <button
                        type="submit"
                        className="lg:my-4 p-2 bg-slate-600 hover:bg-slate-700 text-slate-50 rounded-md m-2"
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* add a review */}
          <div className="ml-4">
            <h2 className="text-slate-700 font-bold text-md pr-2">Reviews</h2>
            {product.reviews.length === 0 && (
              <Message variant={"text-blue-700 bg-blue-200"}>
                No Reviews
              </Message>
            )}
            <div className="my-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-slate-100 p-2 my-4 md:w-9/12 mx-2">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <h2 className="text-slate-700 font-bold text-md pr-2 mt-6">
              Write a Customer Review
            </h2>
            {isReviewLoading && <Loader />}
            {userInfo ? (
              <form onSubmit={submitHandler} className="my-4">
                <label
                  htmlFor="rating-label"
                  className="text-gray-500 font-bold pr-4"
                >
                  Rating:
                </label>
                <select
                  id="rating-label"
                  className="border-2 border-zinc-500 w-28 rounded-md focus:outline-0 p-[3px] pl-2 appearance-none bg-none"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="" className="overflow-auto text-sm">
                    Select ...
                  </option>
                  <option value="1" className="overflow-auto text-sm">
                    1- Poor
                  </option>
                  <option value="2" className="overflow-auto text-sm">
                    2- Fair
                  </option>
                  <option value="3" className="overflow-auto text-sm">
                    3- Good
                  </option>
                  <option value="4" className="overflow-auto text-sm">
                    4- Very Good
                  </option>
                  <option value="5" className="overflow-auto text-sm">
                    5- Excellent
                  </option>
                </select>

                <div className="my-6 md:w-2/3">
                  <div className="md:w-1/3">
                    <label
                      className=" text-gray-500 font-bold pr-4"
                      htmlFor="comment-label"
                    >
                      Comment
                    </label>
                  </div>
                  <div className="md:w-full">
                    <textarea
                      className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                      id="comment-label"
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  disabled={isReviewLoading}
                >
                  Submit
                </button>
              </form>
            ) : (
              <Message variant={"text-blue-700 bg-blue-200"}>
                Please{" "}
                <Link to="/login" className="font-bold text-bue-900">
                  Sign in
                </Link>{" "}
                to write a review.
              </Message>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
