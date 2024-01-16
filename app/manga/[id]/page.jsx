import { fetchMangaInfo, fetchTopMangas } from "../../../API/request";
import PopularMangas from "../../../Components/PopularMangas";
import MangaInfo from "../../../Components/MangaInfo";
import Link from "next/link";

const page = async ({ params }) => {
  const manga = await fetchMangaInfo(params.id);
  const popular = await fetchTopMangas();
  return (
    <div className="color-text m-5 grid max-w-screen-2xl grid-cols-1 gap-2 md:mx-auto md:gap-5 md:px-16 md:py-16 lg:grid-cols-[70%,30%]">
      <div>
        {/* Navigation Link */}
        <div className="background mb-2 flex h-max w-full gap-2 rounded bg-[#fff1] px-5 py-3 text-sm">
          <Link href="/" className="hover:text-purple-500">
            Home
          </Link>
          <span>/</span>
          <p>
            {manga?.attributes?.title["en"] ||
              manga?.attributes?.title["ja-ro"]}
          </p>
        </div>
        {/* Manga Info */}
        <MangaInfo manga={manga} />
      </div>
      <PopularMangas mangas={popular} />
    </div>
  );
};

export default page;
