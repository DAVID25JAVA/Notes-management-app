"use client";
import Link from "next/link";
import { sidebarLinks } from "../../public/assets";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed md:static bottom-0 md:bottom-auto w-full md:w-64">
      <div className="md:h-screen h-16 md:border-r border-t md:border-t-0 border-indigo-300 bg-white flex md:flex-col flex-row transition-all duration-300">

        {sidebarLinks.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Link
              href={item.path}
              key={index}
              className={`flex items-center justify-center md:justify-start gap-3
                md:py-3 py-2 md:px-4 w-full
                text-gray-700 transition
                ${
                  isActive
                    ? "bg-indigo-100 md:border-r-4 md:border-r-indigo-400"
                    : "hover:bg-indigo-50"
                }`}
            >
              {item.icon}
              <span className="hidden md:block text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
