import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
  return (
    <div className=" mt-[50px] mx-6 md:mt-24 mb-2">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="font-bold text-xl font-sans text-slate-700">
        Select Payment method
      </h1>
      <form onSubmit={submitHandler}>
      <div className="my-4">
        <input
          onChange={(e) => setPaymentMethod(e.target.value)}
          value="PayPal"
          type="radio"
          name="paymentMethod"
          id="paypal"
          checked
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
      <div className="mb-4">
        <input
          onChange={(e) => setPaymentMethod(e.target.value)}
          value="CashOnDelivery"
          type="radio"
          name="paymentMethod"
          id="cash"
        />
        <label htmlFor="cash">Cash on delivery</label>
      </div>
      <button
            className="mb-8 shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
        >
            Continue
        </button>
      </form>
    </div>
  );
}

export default PaymentScreen