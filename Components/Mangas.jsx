import Link from "next/link";
import React from "react";

const Mangas = () => {
  return (
    <div className="w-full h-full background rounded">
      <header className="flex justify-between px-2 md:py-2 py-1 items-center border-b border-[#fff2]">
        <p className="md:text-lg text-md">Latest</p>
        <Link
          href="#"
          className="px-2 py-1 bg-purple-500 rounded md:text-sm text-xs text-white"
        >
          View All
        </Link>
      </header>
    </div>
  );
};

export default Mangas;
