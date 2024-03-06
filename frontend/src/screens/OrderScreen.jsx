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
  console.log(error?.message);
  return (
    <div className="mt-[50px] mx-6 md:mt-24 mb-2">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="red">{error?.message.toString()}</Message>
      ) : (
        <h1>order</h1>
      )}
    </div>
  );
}

export default OrderScreen;
