import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

function ShippingScreen() {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <div className=" mt-[50px] mx-6 md:mt-24 h-[80vh]">
      <h1 className="font-bold text-xl font-sans text-slate-700">Shipping</h1>
      <form className="w-full max-w-md mt-6" onSubmit={submitHandler}>
        <div className="mb-6 md:w-full">
          <div className="md:w-1/3">
            <label
              className=" text-gray-500 font-bold pr-4"
              htmlFor="inline-address"
            >
              Address
            </label>
          </div>
          <div className="md:w-full">
            <input
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="md:w-1/3">
            <label
              className="text-gray-500 font-bold pr-4"
              htmlFor="inline-city"
            >
              City
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="md:w-1/3">
            <label
              className="text-gray-500 font-bold pr-4"
              htmlFor="inline-codePostal"
            >
              Postal Code
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-codePostal"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="md:w-1/3">
            <label
              className="text-gray-500 font-bold pr-4"
              htmlFor="inline-country"
            >
              Country
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-2/3">
            <button
              className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ShippingScreen