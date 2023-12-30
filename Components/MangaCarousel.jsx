import { fetchCoverImages, makeRequest } from "@/API/request";
import Image from "next/image";
import Link from "next/link";

export const Carousel = async () => {
  const req = await makeRequest(
    "/manga",
    "GET",
    { limit: 100 },
    { rating: "desc", followedCount: "desc" }
  );

  const array = [];
  for (let i = 0; i <= 6; i++) {
    const randomIndex = Math.floor(Math.random() * req.data.length);
    array.push(req.data[randomIndex]);
  }

  const mangas = await fetchCoverImages(array);

  return mangas.map((manga) => {
    return (
      <div className="w-full flex-shrink-0 snap-start h-full backdrop-blur-sm backdrop-brightness-50 grid md:grid-cols-[75%,25%] grid-cols-[70%,30%] gap-1 items-center md:px-5 px-2">
        <div className="w-full">
          <div className="flex items-center">
            <div className="relative">
              <Image
                className="md:w-[50px] md:h-[50px] w-[40px] h-[40px]"
                src="/images/star.png"
                alt="star"
                width={50}
                height={50}
              />
              <p className="absolute top-2/4 left-2/4 translate-y-[-35%] translate-x-[-50%] md:text-sm text-xs text-black">
                9.9
              </p>
            </div>
            <div>
              <h1 className="md:text-2xl text-lg text-white">
                The Tutorial Is Too Hard
              </h1>
              <h2 className="uppercase md:text-sm text-xs text-white">
                Manhwa
              </h2>
            </div>
          </div>
          {/* Genres */}
          <div className="ml-2 flex flex-col gap-2">
            <p className="md:text-sm text-xs text-ellipsis w-5/6 h-5 whitespace-nowrap overflow-hidden text-white">
              Action, Adventure, Comedy, Harem, Fantasy
            </p>
            <h5 className="md:text-base text-sm font-semibold text-white">
              Summary
            </h5>
            <p className="md:text-sm text-xs font-light md:h-10 h-8 overflow-hidden w-full text-white">
              Max-level internal arts, max-level external arts. Jianghu, Murim’s
              famous and strongest, Cha Shin Hyeon. I came back to Earth after
              reaching the peak of martial arts, but why has everything
            </p>
            <p className="md:text-sm text-xs font-normal text-white">
              Status: Ongoing
            </p>
            <p className="md:text-sm text-xs font-normal text-white">
              Author: mook hyun
            </p>
          </div>
        </div>
        <Link href="#" className="md:pr-0 pr-3">
          <img className="md:w-full aspect-auto rounded" src={manga?.cover} />
        </Link>
      </div>
    );
  });
};

const MangaCarousel = () => {
  return (
    <div className="md:h-[250px] h-[200px] showcase bg-center bg-no-repeat bg-cover rounded-md md:rounded-r-none w-full flex items-start overflow-x-auto overflow-y-hidden snap-mandatory snap-x scrollbar-hidden">
      <Carousel />
    </div>
  );
};

export default MangaCarousel;
