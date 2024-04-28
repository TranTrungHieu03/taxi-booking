"use client";
import CarList from "@/app/data/CarList";
import Image from "next/image";
import React, { useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-2  m-1 p-2">
        {CarList.map((item) => (
          <div
            key={item.id}
            className={`m-2 rounded-md border-2 p-2 items-center justify-around flex hover:border-yellow-400 cursor-pointer ${
              selectedCar === item.id ? "border-yellow-400 border-2" : null
            }`}
            onClick={() => setSelectedCar(item.id)}
          >
            <Image src={item.image} alt={item.name} height={75} width={80} />
            <div className="md:flex lg:flex-col gap-4 float-right justify-center items-center">
              <h2 className="text-[14px] text-gray-500">{item.name}</h2>
              <span className="float-right text-black">
                {item.charge * 8} $
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
