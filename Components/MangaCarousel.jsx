import { fetchCoverImages, makeRequest } from "@/API/request";
import Link from "next/link";

export const Carousel = async () => {
  const req = await makeRequest(
    "/manga",
    "GET",
    { limit: 50 },
    { rating: "desc", followedCount: "desc" }
  );

  const array = [];
  for (let i = 0; i <= 6; i++) {
    const randomIndex = Math.floor(Math.random() * req.data.length);
    array.push(req.data[randomIndex]);
    req.data.pop(randomIndex);
  }

  const mangas = await fetchCoverImages(array);

  const contentTypeBg = {
    safe: "bg-[green]",
    suggestive: "bg-[pink]",
    pornographic: "bg-[red]",
  };

  return mangas.map((manga) => {
    return (
      <div className="w-full flex-shrink-0 snap-start h-full backdrop-blur-sm backdrop-brightness-50 grid md:grid-cols-[75%,25%] grid-cols-[70%,30%] gap-1 items-center md:px-5 px-2">
        <img
          src={manga?.cover}
          alt="background"
          className="absolute top-0 brightness-[.3] z-0 object-contain object-center bg-no-repeat w-full h-auto"
        />
        <div className="w-full z-10 md:self-center self-start">
          <div className="p-2 flex items-center">
            <div>
              <h1
                className="md:text-2xl text-lg text-white h-8 overflow-hidden"
                title={
                  manga?.manga?.attributes.title["en"]
                    ? manga?.manga?.attributes.title["en"]
                    : manga?.manga?.attributes.title["ja-ro"]
                }
              >
                {manga?.manga?.attributes.title["en"]
                  ? manga?.manga?.attributes.title["en"]
                  : manga?.manga?.attributes.title["ja-ro"]}
              </h1>
              <h2 className="uppercase md:text-sm text-xs text-white flex gap-1">
                <p className={`w-min py-[2px] px-1 text-xs rounded bg-[#fff5]`}>
                  {manga?.manga?.type}
                </p>
                {manga?.manga?.attributes?.publicationDemographic && (
                  <p
                    className={`w-min py-[2px] px-1 text-xs rounded bg-[#fff5]`}
                  >
                    {manga?.manga?.attributes?.publicationDemographic}
                  </p>
                )}
                <p
                  className={`w-min py-[2px] px-1 text-xs rounded ${
                    contentTypeBg[manga?.manga?.attributes?.contentRating]
                  }`}
                >
                  {manga?.manga?.attributes?.contentRating}
                </p>
              </h2>
            </div>
          </div>
          {/* Genres */}
          <div className="ml-2 flex flex-col gap-2">
            <p className="md:text-sm text-xs text-ellipsis w-5/6 h-5 whitespace-nowrap overflow-hidden text-white">
              {manga?.manga?.attributes?.tags?.map((tag, index) => {
                if (index <= 5) {
                  return (
                    <Link
                      key={index}
                      href="#"
                      className="hover:text-purple-500 mr-1"
                    >
                      {tag.attributes.name["en"]}
                      {index !== 5 && ","}
                    </Link>
                  );
                }
              })}
            </p>
            <h5 className="md:text-base text-sm font-semibold text-white">
              Summary
            </h5>
            <p
              className="md:text-sm text-xs font-light md:h-14 h-12 overflow-hidden w-full text-white"
              title={manga?.manga?.attributes.description["en"]}
            >
              {manga?.manga?.attributes.description["en"]}
            </p>
            <p className="md:text-sm text-xs font-normal text-white flex gap-1 items-center">
              Status:
              <span className={`md:text-sm text-xs rounded uppercase`}>
                {manga?.manga?.attributes?.status}
              </span>
            </p>
          </div>
        </div>
        <Link href="#" className="md:pr-0 pr-3">
          <img
            className="md:w-full relative z-10 aspect-auto rounded"
            src={manga?.cover}
            alt="manga-link"
          />
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
