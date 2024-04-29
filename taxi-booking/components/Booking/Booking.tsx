"use client";
import React, { useContext, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { constants } from "@/constants";

const Booking = () => {
  const screenHight = window.innerHeight * 0.8 || 700;
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);
  const router: any = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const handlePayment = () => {
    window.location.href = constants.paymentLinks.preOrder;
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>

      <div
        className="border-[1px] p-5 rounded-md "
        style={{ height: screenHight }}
      >
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full  p-1 rounded-md mt-4 cursor-pointer ${
            !carAmount ? "bg-gray-200" : " bg-yellow-400"
          }`}
          disabled={!carAmount}
          onClick={handlePayment}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
