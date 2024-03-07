import React from "react";
import { Link } from  'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="mt-[50px] mx-6 md:mt-24">
      <h1 className="font-bold text-xl font-sans text-slate-700">
        Shopping Cart
      </h1>
      {cartItems?.length === 0 ? (
        <Message variant={"text-red-700 bg-red-200"}>Your cart is empty <Link to='/'>Go Back</Link></Message>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="border-b-2 border-zinc-400 my-4" key={item._id}>
              <div className="flex flex-col md:flex-row md:mb-2">
                <div className="flex flex-col xs:flex-row xs:justify-between">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full xs:w-3/5 md:w-5/12"
                  />
                  <div className="flex flex-col xs:text-sm md:text-md md:w-3/12">
                    <h2 className="text-zinc-500 font-bold ml-2">
                      {item.name}
                    </h2>
                    <p className="text-zinc-700 font-bold ml-2">
                      $ {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-around my-2 md:flex-col md:w-3/12 md:my-0 md:items-start md:justify-start">
                  {/* select quantity */}
                  <select
                    className="border-2 border-zinc-500 w-16 rounded-md focus:outline-0 pl-2 appearance-none bg-none"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option
                        key={x + 1}
                        value={x + 1}
                        className="overflow-auto"
                      >
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <i 
                    className="fa-solid fa-trash text-zinc-500 hover:text-slate-700 cursor-pointer md:my-4"
                    onClick={()=>removeFromCartHandler(item._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-zinc-400 rounded-lg my-2 pb-2 shadow sm:w-2/5">
            <h2 className="border-b-2 border-zinc-400 my-2 pl-2 pb-2 font-bold ">
              {`Subtotal (${cartItems.reduce(
                (acc, item) => acc + item.qty,
                0
              )}) Items:`}
              <span className="pl-4 text-slate-700">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </h2>
            <Link to={'/shipping'} className="mx-4 mt-4 text-zinc-50 bg-zinc-700 p-1 rounded-sm">Proceed To Checkout</Link>
          </div> 
        </>
      )}
    </div>
  );
}

export default Cart;
