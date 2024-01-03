"use client";
import {
  fetchCoverImages,
  fetchStats,
  fetchTopMangas,
  makeRequest,
} from "@/API/request";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PopularMangas = () => {
  const [toggle, setToggle] = useState(true);
  const [mangas, setMangas] = useState([]);
  const [statistic, setStatistic] = useState([]);

  const handleToggle = (toggle) => {
    setToggle(toggle);
  };

  useEffect(() => {
    setMangas([]);
    setStatistic([]);
    const fetchData = async () => {
      try {
        const data = await fetchTopMangas(toggle);
        const getManga = await fetchCoverImages(data?.data);
        const stats = await fetchStats(data?.data);
        setMangas(getManga);
        setStatistic(stats);
      } catch (error) {
        console.error("Error fetching top mangas:", error);
      }
    };
    fetchData();
  }, [toggle]);

  console.log(statistic);
  return (
    <div className="w-full background rounded-md">
      <header className="border-b-[1px] border-[#fff1] py-2 flex">
        <button className="px-3" onClick={() => handleToggle(true)}>
          Popular
        </button>
        <button className="px-3" onClick={() => handleToggle(false)}>
          Top Rated
        </button>
      </header>
      {/* Mangas */}
      {mangas?.map((manga, index) => {
        return (
          <div
            key={manga?.manga?.attributes.title["en"]}
            className={`flex gap-2 p-2 ${
              index === 0 ? "" : "border-t border-[#fff1]"
            }`}
          >
            <Link href="#" className="flex justify-center items-center">
              <img
                className="md:w-28 w-20 h-full object-cover rounded place-self-center"
                src={manga?.cover}
              />
            </Link>
            <div className="flex flex-col justify-around">
              <Link
                href="#"
                key={manga?.manga?.attributes.title["en"]}
                className="hover:text-purple-500 md:text-base text-sm"
              >
                {manga?.manga?.attributes.title["en"]
                  ? manga?.manga?.attributes.title["en"]
                  : manga?.manga?.attributes.title["ja-ro"]}
              </Link>
              <div className="flex gap-1 text-sm">
                <p className="opacity-75">Genres:</p>
                <div className="flex gap-1 flex-wrap opacity-100">
                  {manga?.manga?.attributes?.tags?.map((tag, index) => {
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
                    ? statistic[index].follows
                    : statistic[index]?.rating?.average.toFixed(2)}
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
