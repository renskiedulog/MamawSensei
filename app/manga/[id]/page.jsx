import Link from "next/link";
import { fetchMangaInfo, fetchTopMangas } from "../../../API/request";
import PopularMangas from "../../../Components/PopularMangas";

const page = async ({ params }) => {
  const manga = await fetchMangaInfo(params.id);
  const popular = await fetchTopMangas();
  return (
    <div className="color-text m-5 grid max-w-screen-2xl grid-cols-1 gap-2 md:m-0 md:mx-auto md:gap-5 md:px-16 md:py-16 lg:grid-cols-[70%,30%]">
      <div className="flex flex-col gap-2 md:gap-5">
        {/* Navigation Link */}
        <div className="flex items-center gap-2 rounded bg-[#fff1] px-5 py-3 text-xs md:text-sm">
          <Link href="/" className="hover:text-purple-500">
            Home
          </Link>
          <span className="text-xs">/</span>
          <p>
            {manga[0]?.attributes?.title["en"] ||
              manga[0]?.attributes?.title["ja-ro"]}
          </p>
        </div>
        {/* Manga Info */}
        <div className="flex w-full flex-col overflow-hidden rounded bg-[#fff1] py-3 md:flex-row md:py-5">
          <div className="flex min-w-52 flex-col items-center gap-2 overflow-hidden md:w-56">
            <img
              src={manga[0]?.cover}
              alt="manga-cover"
              className="aspect-[1/1.5] w-1/4 rounded md:w-10/12"
            />
            {/* Button And Follows */}
            <div className="w-3/5 text-center md:w-10/12">
              <button className="flex w-full items-center justify-center gap-1 rounded-md bg-purple-700 py-1 hover:bg-purple-900 md:py-2">
                <i class="fa-regular fa-bookmark"></i>
                Bookmark
              </button>
              <p className="py-1 text-sm text-[#fff8]">
                Followed by {manga[0]?.stats?.follows} people
              </p>
            </div>
            {/* Rating, Status and Type */}
            <div className="grid w-3/5 grid-cols-2 flex-col gap-1 text-sm md:flex md:w-10/12">
              {/* Rating */}
              <div className="col-span-2 flex w-full items-center justify-between gap-1 rounded bg-[#fff1] px-2 py-1.5">
                <p className=" font-light opacity-70">Rating</p>
                <p className="flex items-center gap-1 opacity-70">
                  {manga[0]?.stats?.rating?.average?.toFixed(2)}
                  <img
                    src="/images/star.png"
                    alt="star"
                    className="aspect-auto w-5 translate-y-[-2px]"
                  />
                </p>
              </div>
              {/* Status */}
              <div className="flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2">
                <p className=" font-light opacity-70">Status</p>
                <p className="flex items-center gap-1 opacity-70">
                  {manga[0]?.attributes?.status?.toUpperCase()}
                </p>
              </div>
              {/* Type */}
              <div className="flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2">
                <p className="font-light opacity-70">Type</p>
                <p className="flex items-center gap-1 opacity-70">
                  {manga[0]?.type?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          {/* Manga Details */}
          <div className="p-5 md:p-0">
            <p className="text-center text-2xl font-bold md:text-left">
              {manga[0]?.attributes?.title["en"] ||
                manga[0]?.attributes?.title["ja-ro"]}
            </p>
            <div className="my-2 flex flex-wrap items-center justify-center gap-1 md:justify-start">
              <Link
                href="#"
                class="flex min-w-20 items-center gap-2 rounded bg-indigo-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
              >
                <i class="fa-brands fa-facebook-f"></i>
                Facebook
              </Link>
              <Link
                href="#"
                class="flex min-w-20 items-center gap-2 rounded bg-blue-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
              >
                <i class="fa-brands fa-twitter"></i>
                Twitter
              </Link>
              <Link
                href="#"
                class="flex min-w-20 items-center gap-2 rounded bg-green-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
              >
                <i class="fa-brands fa-whatsapp"></i>
                Whatsapp
              </Link>
              <Link
                href="#"
                class="flex min-w-20 items-center gap-2 rounded bg-indigo-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
              >
                <i class="fa-brands fa-discord"></i>
                Discord
              </Link>
              <Link
                href="#"
                class="flex min-w-20 items-center gap-2 rounded bg-red-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
              >
                <i class="fa-brands fa-pinterest"></i>
                Pinterest
              </Link>
            </div>
            <div>
              <h1 className="py-1 text-sm md:text-base">Sypnosis:</h1>
              <p className="mt-1 pr-5 text-xs font-light opacity-80 md:text-base">
                {manga[0]?.attributes?.description["en"]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PopularMangas mangas={popular} />
    </div>
  );
};

export default page;
