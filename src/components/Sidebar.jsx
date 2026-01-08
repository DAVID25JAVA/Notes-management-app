"use client";
import Link from "next/link";
import { sidebarLinks } from "../../public/assets";
import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="md:w-64 w-16 border-r h-137.5 text-base border-indigo-300 pt-4 flex gap-1 flex-col transition-all duration-300">
        {sidebarLinks.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            onClick={() => setActive(index)}
            className={`flex items-center py-3 px-4 gap-3 text-gray-700 ${
              active == index
                ? "bg-indigo-100 border-r-4 border-r-indigo-400"
                : "hover:bg-indigo-50"
            }`}
          >
            {item.icon}
            <p className="md:block hidden text-center">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
