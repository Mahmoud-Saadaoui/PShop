import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader"
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import { toast } from 'react-toastify'

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  
  const [createOrder, { isLoading, error, isError }] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async() => {
    try {
        const res = await createOrder({
            orderItems: cart.orderItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap()
        dispatch(clearCartItems())
        navigate(`/order/${res?._id}`)
    } catch (error) {
        toast.error(error)
    }
  }

  return (
    <div className=" mt-[50px] mx-6 md:mt-24 mb-2">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row md:items-start md:justify-between lg:justify-around">
        <div>
          <h1 className="text-slate-700 font-bold text-lg">Shipping</h1>
          <p className="text-sm py-2 border-b-2 border-zinc-400">
            <strong>Address: </strong>
            {cart.shippingAddress.address}{" "}, {cart.shippingAddress.city}{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
          <h1 className="text-slate-700 font-bold text-lg mt-4">
            Payment Method
          </h1>
          <p className="text-sm py-2 border-b-2 border-zinc-400">
            <strong>Method:</strong> {cart.paymentMethod}
          </p>
          <h1 className="text-slate-700 font-bold text-lg mt-4 pb-2">
            Order Items
          </h1>
          {cart?.cartItems?.length === 0 ? (
            <Message variant="red">Your cart is empty</Message>
          ) : (
            <>
              {cart?.cartItems.map((item) => (
                <div
                  key={item?._id}
                  className="flex justify-between mb-4 border-b-[1px] border-zinc-300 pb-2"
                >
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 lg:w-20"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-sm text-slate-800 font-bold">
                      <Link to={`/product/${item._id}`}>{item?.name}</Link>
                    </h3>
                    <p className="text-sm text-slate-800">
                      {item.qty} x ${item.price} = $
                      {(item.qty * (item.price * 100)) / 100}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="border-2 border-slate-600 rounded shadow-lg w-[170px] m-4 p-2">
          <h1 className="border-b-2 border-slate-400 pb-2">Order Summary</h1>
          <p className="m-1">
            <strong className="mr-6">Items:</strong> ${cart.itemsPrice}
          </p>

          <p className="m-1">
            <strong>Shipping:</strong> ${cart.shippingPrice}
          </p>

          <p className="m-1">
            <strong className="mr-10">Tax:</strong> ${cart.taxPrice}
          </p>

          <p className="m-1">
            <strong className="mr-8">Total:</strong> ${cart.totalPrice}
          </p>

          <p className="m-1">
            {isError && <Message variant={"red"}>{error}</Message>}
          </p>

          <button
            type="button"
            className="bg-slate-700 p-2 rounded text-slate-50 mt-4 font-bold"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader/>}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
