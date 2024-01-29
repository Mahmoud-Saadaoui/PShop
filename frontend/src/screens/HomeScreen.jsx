import React from 'react'
import products from '../products'
import Product from '../components/Product'

function HomeScreen() {
  return (
    <div className='mt-20 mx-6 md:mt-24'>
      <h1 className='font-bold text-xl font-sans text-slate-700'>
        Latest Products
      </h1>
      <div className="mt-6 xs:flex flex-wrap justify-center">
      {
        products.map((product, index) => (
          <Product product={product} key={index}/>
        ))
      }
      </div>
    </div>
  )
}

export default HomeScreen