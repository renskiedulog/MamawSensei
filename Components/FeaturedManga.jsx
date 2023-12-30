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
          storedDate.getDate() === currentDate.getDate() &&
          storedDate.getMonth() === currentDate.getMonth() &&
          storedDate.getFullYear() === currentDate.getFullYear()
        ) {
          setFeaturedManga(manga);
          return;
        }
      }
      const req = await makeRequest(
        "/manga/",
        "GET",
        { limit: 100 },
        { followedCount: "desc", rating: "desc" }
      );
      const mangas = await fetchCoverImages(req?.data);
      const randomIndex = Math.floor(Math.random() * mangas.length);
      const newFeatured = mangas[randomIndex];
      const newFeaturedWithDate = {
        manga: newFeatured,
        date: new Date().toISOString().split("T")[0],
      };

      localStorage.setItem("featured", JSON.stringify(newFeaturedWithDate));
      setFeaturedManga(newFeatured);
    };

    getFeaturedManga();
  }, []);

  return (
    <Link
      href="#"
      className="md:block hidden relative overflow-hidden group"
      title={
        featuredManga?.manga?.attributes?.title["en"]
          ? featuredManga?.manga?.attributes?.title["en"]
          : featuredManga?.manga?.attributes?.title["ja-ro"]
      }
    >
      <img
        className="absolute w-full h-[250px] rounded-r-md object-cover object-center brightness-75"
        src={featuredManga?.cover}
      />
      <div className="absolute w-full bg-red-500 rotate-45 md:text-base top-[8%] right-[-35%] text-center">
        Featured
      </div>
      <div className="absolute bottom-0 w-full overlay h-1/2 flex justify-end flex-col items-center pb-2 text-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
        <h1 className="md:text-lg text-base h-[60px] text-white">
          {featuredManga?.manga?.attributes?.title["en"]
            ? featuredManga?.manga?.attributes?.title["en"]
            : featuredManga?.manga?.attributes?.title["ja-ro"]}
        </h1>
      </div>
    </Link>
  );
};

export default FeaturedManga;
