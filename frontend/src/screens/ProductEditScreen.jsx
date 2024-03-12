import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mt-[50px] mx-6 lg:mt-24 mb-2">
      <div className="mt-4 w-[100px] bg-gray-300 p-2 text-center rounded-md hover:bg-gray-600 hover:text-gray-50 duration-200">
        <Link to="/admin/productlist">Go Back</Link>
      </div>
      <h1 className="mt-2 text-slate-700 font-bold text-lg">Edit Product</h1>
      <form className="w-full max-w-md mt-6" onSubmit={submitHandler}>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"text-red-700 bg-red-200"}>{error}</Message>
        ) : (
          <>
            <div className="mb-6 md:w-full">
              <div className="md:w-2/3">
                <label
                  className=" text-gray-500 font-bold pr-4"
                  htmlFor="inline-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-name"
                  type="text"
                  placeholder="Enter a name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="md:w-2/3">
                <label
                  className="text-gray-500 font-bold pr-4"
                  htmlFor="inline-price"
                >
                  Price
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-price"
                  type="number"
                  placeholder="Enter a price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6 md:w-full">
              <div className="md:w-2/3">
                <label
                  className=" text-gray-500 font-bold pr-4"
                  htmlFor="inline-img"
                >
                  Image
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-img"
                  type="text"
                  placeholder="Enter Image Url"
                  aria-label="img"
                  value={image}
                  onChange={(e) => setImage}
                />
              </div>
              <div className="md:w-full">
                <input
                  className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  // id="inline-img"
                  type="file"
                  placeholder="Choose Image"
                  onChange={uploadFileHandler}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="md:w-1/3">
                <label
                  className="text-gray-500 font-bold pr-4"
                  htmlFor="inline-category"
                >
                  Category
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-category"
                  type="text"
                  placeholder="Enter a category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="md:w-2/3">
                <label
                  className="text-gray-500 font-bold pr-4"
                  htmlFor="inline-Brand"
                >
                  Brand
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-Brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="md:w-2/3">
                <label
                  className="text-gray-500 font-bold pr-4"
                  htmlFor="inline-Description"
                >
                  Description
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-Description"
                  type="text"
                  placeholder="Describe the product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="md:w-2/3">
                <label
                  className="text-gray-500 font-bold pr-4"
                  htmlFor="inline-CountInStock"
                >
                  Count In Stock
                </label>
              </div>
              <div className="w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                  id="inline-CountInStock"
                  type="number"
                  placeholder="Count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
            </div>
            <button
              className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mb-4 rounded"
              type="submit"
            >
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEditScreen;
