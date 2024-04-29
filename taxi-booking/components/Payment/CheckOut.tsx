"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

const CheckOut = () => {
  const stripe: any = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (elements === null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    const secretKey = await fetch(`/api/create-intent`, {
      method: "POST",
      body: JSON.stringify({
        amount: 58,
      }),
    }).then((res) => res.json());

    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          className="w-full bg-yellow-400 p-2 mt-4 rounded-lg"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
