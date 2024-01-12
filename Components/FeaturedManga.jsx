"use client";
import { fetchCoverImages, makeRequest } from "@/API/request";
import Link from "next/link";
import { useState, useEffect } from "react";

const FeaturedManga = () => {
  const [featuredManga, setFeaturedManga] = useState(null);

  useEffect(() => {
    const getFeaturedManga = async () => {
      const storedFeatured = localStorage.getItem("featured");
      if (storedFeatured) {
        const { manga, date } = JSON.parse(storedFeatured);
        const storedDate = new Date(date);
        const currentDate = new Date();
        if (
          storedDate.getUTCDate() === currentDate.getUTCDate() &&
          storedDate.getUTCMonth() === currentDate.getUTCMonth() &&
          storedDate.getUTCFullYear() === currentDate.getUTCFullYear()
        ) {
          setFeaturedManga(manga[0]);
          return;
        }
      }
      const req = await makeRequest(
        "/manga/",
        { limit: 100 },
        { followedCount: "desc", rating: "desc" }
      );
      const randomIndex = Math.floor(Math.random() * 100);
      const newFeatured = await fetchCoverImages([req?.data[randomIndex]]);
      const newFeaturedWithDate = {
        manga: newFeatured,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(new Date().toISOString().split("T")[0]);

      localStorage.setItem("featured", JSON.stringify(newFeaturedWithDate));
      setFeaturedManga(newFeatured[0]);
    };

    getFeaturedManga();
  }, []);

  return (
    <Link href="#" className="md:block hidden relative overflow-hidden group">
      <img
        className="absolute w-full h-[250px] rounded-r-md object-cover object-center brightness-90"
        src={featuredManga?.cover}
      />
      <div className="absolute w-full bg-red-500 rotate-45 md:text-base top-[8%] right-[-35%] text-center text-white">
        Featured
      </div>
      <div className="absolute bottom-0 w-full overlay h-full flex justify-end flex-col items-center pb-2 text-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
        <h1 className="md:text-lg text-base h-max text-white flex justify-center items-center w-5/6">
          {featuredManga?.attributes?.title["en"]
            ? featuredManga?.attributes?.title["en"]
            : featuredManga?.attributes?.title["ja-ro"]}
        </h1>
      </div>
    </Link>
  );
};

export default FeaturedManga;
