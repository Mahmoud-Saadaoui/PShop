import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <div className='border-[1px] border-slate-300 rounded-md shadow-md shadow-zinc-300 p-2 mb-4
    xs:w-5/12 xs:mx-2 md:w-1/4 xl:w-1/5'
    >
        <img src={product.image} alt={product.name} />
        <Link to={`/product/${product._id}`}>
            <p className='font-mono text-xs hover:text-red-800 hover:text-sm hover:font-bold duration-200'>
                {product.name}
            </p>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        <p className="text-md font-bold text-slate-500">$ {product.price}</p>
    </div>
  )
}

export default Product