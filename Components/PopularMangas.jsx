"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PopularMangas = ({ mangas }) => {
  const [toggle, setToggle] = useState(true);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    setDisplayed([]);
    if (toggle) {
      setDisplayed(mangas?.popular);
    } else {
      setDisplayed(mangas?.topRated);
    }
  }, [toggle]);

  const handleToggle = (toggle) => {
    setToggle(toggle);
  };

  return (
    <div className="w-full h-max background rounded-md overflow-hidden">
      <header key="header" className="border-b-[1px] border-[#fff1] flex">
        <button
          className={`px-3  py-2 ${toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(true)}
        >
          Popular
        </button>
        <button
          className={`px-3 py-2 ${!toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(false)}
        >
          Top Rated
        </button>
      </header>
      {/* Mangas */}
      {displayed?.manga?.map((manga, index) => {
        return (
          <div
            key={index}
            className={`flex gap-2 p-2 ${
              index === 0 ? "" : "border-t border-[#fff1]"
            }`}
          >
            <Link
              key={index}
              href="#"
              className="flex justify-center items-center"
            >
              <img
                className="max-w-20 w-20 h-auto object-cover rounded place-self-center"
                src={manga?.cover}
              />
            </Link>
            <div className="flex flex-col justify-around">
              <Link
                href="#"
                key={manga?.attributes.title["en"]}
                className="hover:text-purple-500 text-base"
              >
                {manga?.attributes.title["en"]
                  ? manga?.attributes.title["en"]
                  : manga?.attributes.title["ja-ro"]}
              </Link>
              <div className="flex gap-1 text-sm">
                <p className="opacity-75">Genres:</p>
                <div className="flex gap-1 flex-wrap opacity-100 h-12 break-all whitespace-nowrap overflow-hidden">
                  {manga?.attributes?.tags?.map((tag, index) => {
                    if (index <= 5) {
                      return (
                        <Link
                          key={index}
                          href="#"
                          className="hover:text-purple-500"
                        >
                          {tag.attributes.name["en"]}
                          {index !== 5 && ","}
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <p className="md:text-sm text-xs opacity-75">
                  {toggle ? "Follows:" : "Rating:"}
                </p>
                <p className="md:text-sm text-xs">
                  {toggle
                    ? displayed?.stats[index].follows
                    : displayed?.stats[index]?.rating?.average.toFixed(2)}
                </p>
                {!toggle && (
                  <img
                    src="/images/star.png"
                    alt="rating"
                    className="w-5 aspect-auto translate-y-[-1px]"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularMangas;
