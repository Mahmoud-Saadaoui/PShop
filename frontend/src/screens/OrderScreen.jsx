import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  return (
    <div className="mt-[50px] mx-6 md:mt-24 mb-2">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"text-red-700 bg-red-200"}>{error?.message.toString()}</Message>
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
                <Message variant={"text-red-700 bg-red-200"}>Not Delivered</Message>
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
                <Message variant={"text-green-700 bg-green-200"}>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant={"text-red-700 bg-red-200"}>Not Paid</Message>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
