"use client";
import { getMangaChapters } from "../API/request";

const Chapters = async ({ mangaId }) => {
  const chapters = await getMangaChapters(mangaId);
  console.log(chapters);
  return <div>{mangaId}</div>;
};

export default Chapters;
