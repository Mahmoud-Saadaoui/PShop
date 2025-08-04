import React from 'react'
import Hero from '../components/home/Hero'
import Brands from '../components/home/Brands'
import MostRatedProducts from '../components/home/TopRatedProducts'
import FeatureBrands from '../components/home/FeatureBrands'

const HomePage = () => {
  return (
    <>
      <Hero/>
      <MostRatedProducts/>
      <FeatureBrands/>
      <Brands/>
    </>
  )
}

export default HomePage