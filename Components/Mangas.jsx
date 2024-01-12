import Link from "next/link";
import React from "react";
import MangaFeed from "./MangaFeed";

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
      {/* Manga Feed */}
      <div className="w-full h-auto p-5 gap-3 flex flex-wrap ">
        <MangaFeed />
      </div>
    </div>
  );
};

export default Mangas;
