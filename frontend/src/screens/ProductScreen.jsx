import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../products'
import Rating from '../components/Rating'

function ProductScreen() {
  const [qty, setQty] = useState(1)
    const { id: productId } = useParams()
    const product = products.find(p => p._id === productId)
  return (
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
          className="w-full my-4 mx-auto sm:w-11/12 md:w-9/12 lg:w-3/12"
        />

        <div className="lg:flex lg:flex-col lg:mx-4">
          <div className="flex flex-col border-b-2 border-zinc-400 p-2 md:flex-row md:items-center md:justify-around lg:flex-col lg:items-start">
            <h2 className="text-zinc-500 font-bold ml-2 ">{product.name}</h2>
            <p className="text-zinc-700 font-bold ml-2 mt-2 md:my-auto">$ {product.price}</p>
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
        <div className="border border-gray-500 shadow-md rounded-lg mx-auto my-6 w-11/12 sm:w-9/12 lg:mx-4 lg:w-5/12">
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
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option
                          key={x + 1}
                          value={x + 1}
                          className="overflow-auto"
                        >
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr className="border border-t-gray-500">
                <td className="py-3 px-4 w-full">
                  <button
                    type="submit"
                    className="lg:my-4 p-2 bg-slate-600 hover:bg-slate-700 text-slate-50 rounded-md m-2"
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen