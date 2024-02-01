import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Product from '../components/Product'

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, []);
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