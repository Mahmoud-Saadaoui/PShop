import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);
  return (
    <div className="mt-[50px] mx-6 md:mt-24 mb-2">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"text-red-700 bg-red-200"}>
          {error?.message.toString()}
        </Message>
      ) : (
        <div>
          <h1 className="text-slate-700 font-bold text-lg">
            Order: {order._id}
          </h1>
          <div className="border-b-2 border-zinc-400 mt-4">
            <h3 className="text-slate-700 font-bold text-md pr-2">Shipping</h3>
            <p className="text-slate-700 ml-2 mt-2">
              <strong>Name:</strong> {order.user.name}
            </p>
            <p className="text-slate-700 ml-2 mt-2">
              <strong>Email:</strong> {order.user.email}
            </p>
            <p className="text-slate-700 ml-2 mt-2">
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <div className="mx-2 my-4">
              {order.isDelivered ? (
                <Message variant={"text-green-700 bg-green-200"}>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant={"text-red-700 bg-red-200"}>
                  Not Delivered
                </Message>
              )}
            </div>
          </div>

          <div className="border-b-2 border-zinc-400 mt-4">
            <h3 className="text-slate-700 font-bold text-md pr-2">
              Payment Method
            </h3>
            <p className="text-slate-700 ml-2 mt-2">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            <div className="mx-2 my-4">
              {order.isPaid ? (
                <Message variant={"text-green-700 bg-green-200"}>
                  Paid on {order.paidAt}
                </Message>
              ) : (
                <Message variant={"text-red-700 bg-red-200"}>Not Paid</Message>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-slate-700 font-bold text-md pr-2 pb-2">
              Order Items
            </h3>
            {order?.orderItems.map((item) => (
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
          </div>

          <div className="border-2 border-slate-600 rounded shadow-lg w-[250px] m-4 p-2">
            <h1 className="border-b-2 border-slate-400 pb-2">Order Summary</h1>
            <p className="m-1">
              <strong className="mr-6">Items:</strong> ${order.itemsPrice}
            </p>

            <p className="m-1">
              <strong>Shipping:</strong> ${order.shippingPrice}
            </p>

            <p className="m-1">
              <strong className="mr-10">Tax:</strong> ${order.taxPrice}
            </p>

            <p className="m-1">
              <strong className="mr-8">Total:</strong> ${order.totalPrice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
