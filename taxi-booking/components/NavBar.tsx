import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="flex justify-between border-b-[1px] p-3 px-10 shadow-sm  ">
      <div className="flex justify-center items-center gap-10 ">
        <Image src="/logo.jpg" alt="logo" width={90} height={40} />
        <div className="hidden md:flex gap-6 *:hover:bg-gray-100 *:rounded-mdp-2 *:cursor-pointer *:transition-all">
          <h2>Home</h2>
          <h2>History</h2>
          <h2>Help</h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBar;
