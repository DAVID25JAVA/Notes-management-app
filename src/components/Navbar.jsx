import React from "react";
import { assets } from "../../public/assets";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="border-b border-indigo-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-5 md:px-5 py-2">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <div className="cursor-pointer flex items-center gap-2 font-semibold text-base sm:text-lg">
              <Image
                alt="logo"
                src={assets?.note}
                width={40}
                className="border p-1 rounded-full border-indigo-300"
              />
              <span>Notes Management App</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
