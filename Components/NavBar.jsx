"use client";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";
import SearchBox from "./SearchBox";

const NavBar = () => {
  return (
    <nav className="w-full">
      {/* Logo And Search : Top */}
      <div className="w-full flex h-10 justify-between md:px-20 px-2 py-6 items-center">
        <Link
          href="#"
          className=" text-xl font-semibold tracking-wide color-text"
        >
          MamawSensei
        </Link>

        <div className="flex items-center md:gap-5 gap-3 color-text">
          <SearchBox />
          <ToggleSwitch />
        </div>
      </div>

      {/* Links : Bottom */}
      <div className="w-full flex justify-between items-center md:px-28 px-2 bg-[#9b51e0] text-white">
        {/* Left Side : User Related */}
        <div className="flex">
          <Link
            href="#"
            className="font-normal md:text-base text-xs hover:bg-purple-500 md:px-5 px-2 py-[10px]"
          >
            Home
          </Link>
          <Link
            href="#"
            className="font-normal md:text-base text-xs hover:bg-purple-500 md:px-5 px-2 py-[10px]"
          >
            Bookmarks
          </Link>
          <Link
            href="#"
            className="font-normal md:text-base text-xs hover:bg-purple-500 md:px-5 px-2 py-[10px]"
          >
            Social
          </Link>
        </div>
        {/* Right Side : Site Related */}
        <div className="flex items-center">
          <Link
            href="#"
            className="font-normal md:text-base text-xs hover:bg-purple-500 md:px-5 px-2 py-[10px]"
          >
            Latest
          </Link>
          <Link
            href="#"
            className="font-normal md:text-base text-xs hover:bg-purple-500 md:px-5 px-2 py-[10px]"
          >
            Top Read
          </Link>
          <button
            type="button"
            className="bg-purple-800 md:text-base text-xs px-5 py-1 rounded mx-2 hover:scale-105"
          >
            Random
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
