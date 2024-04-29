"use client";
import {CardList} from "@/app/data/CardList";
import Image from "next/image";
import React, { useState } from "react";

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState<any>();
  return (
    <div>
      <h2 className="text-[14px] font-medium ">Payment Methods</h2>
      <div className="grid grid-cols-3 mt-2 pl-2">
        {CardList.map((item, index) => (
          <div
            key={index}
            className={`w-[50px] border-[1px] hover:border-yellow-400 flex items-center rounded-md cursor-pointer hover:scale-110 transition-all justify-center ${
              index === activeIndex ? "border-yellow-400 border-2" : null
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={item.image} alt={item.name} width={70} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
