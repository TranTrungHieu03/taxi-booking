"use client"
import CheckOut from "@/components/Payment/CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
  );

  const options: any = {
    mode: "payment",
    amount: 437,
    currency: "usd",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOut />
    </Elements>
  );
};

export default Payment;
