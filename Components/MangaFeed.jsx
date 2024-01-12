import { fetchCoverImages, makeRequest, timeAgo } from "@/API/request";
import Link from "next/link";

export const MangaFeed = async () => {
  const req = await makeRequest(
    "/manga",
    {
      limit: 60,
    },
    { updatedAt: "desc" },
    { next: { revalidate: 60 } }
  );
  const mangas = await fetchCoverImages(req?.data, {
    next: { revalidate: 60 },
  });

  return mangas.map((manga, index) => (
    <Link
      key={index}
      className="md:w-28 w-20 flex-grow overflow-hidden group"
      href="#"
    >
      <img
        className="w-full aspect-[1/1.5] rounded object-cover z-10"
        src={manga.cover}
        alt={manga.attributes.title["en"] || manga.attributes.title["ja-ro"]}
      />
      <p
        className="md:text-base text-sm text-center overflow-hidden my-1 h-5 group-hover:text-purple-500"
        title={manga.attributes.title["en"] || manga.attributes.title["ja-ro"]}
      >
        {manga.attributes.title["en"] || manga.attributes.title["ja-ro"]}
      </p>
      <p className="opacity-70 text-xs text-center">
        {timeAgo(manga?.attributes?.updatedAt)}
      </p>
    </Link>
  ));
};

export default MangaFeed;
