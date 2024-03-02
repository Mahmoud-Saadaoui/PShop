import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="flex items-center justify-center mb-6">
      {step1 ? (
        <h2 className="p-2 text-sky-900">
          <Link to={"/login"}>Sign In</Link>
        </h2>
      ) : (
        <h2 className="p-2 text-sky-300">
          <Link disabled>Sign In</Link>
        </h2>
      )}
      {step2 ? (
        <h2 className="p-2 text-sky-900">
          <Link to={"/shipping"}>Shipping</Link>
        </h2>
      ) : (
        <h2 className="p-2 text-sky-300">
          <Link disabled>Shipping</Link>
        </h2>
      )}
      {step3 ? (
        <h2 className="p-2 text-sky-900">
          <Link to={"/payment"}>Payment</Link>
        </h2>
      ) : (
        <h2 className="p-2 text-sky-300">
          <Link disabled>Payment</Link>
        </h2>
      )}
      {step4 ? (
        <h2 className="p-2 text-sky-900">
          <Link to={"/placeorder"}>Place Order</Link>
        </h2>
      ) : (
        <h2 className="p-2 text-sky-300">
          <Link disabled>Place Order</Link>
        </h2>
      )}
    </div>
  );
}

export default CheckoutSteps;
