import React from "react";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

function ProductListScreen() {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  return (
    <div className="mt-[50px] mx-6 lg:mt-24 mb-2">
      <div className="flex justify-around items-center">
        <h1 className="text-slate-700 font-bold text-lg">Products</h1>
        <button
          type="button"
          className="p-2 bg-slate-700 text-slate-100 rounded"
        >
          Create New Product
        </button>
      </div>
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <Message variant={"text-red-700 bg-red-200"}>
          {productsError?.data?.message || productsError.error}
        </Message>
      ) : (
        <div className="flex flex-col my-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>BRAND</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <button className="">
                              <i className="fa-solid fa-pen-to-square text-blue-800"></i>
                            </button>
                          </Link>
                          <button
                            className="ml-4"
                            // onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fa-solid fa-trash text-red-700"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
