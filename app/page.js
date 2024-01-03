import FeaturedManga from "@/Components/FeaturedManga"
import MangaCarousel from "@/Components/MangaCarousel"
import Mangas from "@/Components/Mangas"
import PopularMangas from "@/Components/PopularMangas"

const page = () => {
    return (
        // Chapters And Top Manga Divider
        <div className='grid md:grid-cols-[70%,30%] grid-cols-1 color-text md:py-16 py-5 md:px-16 px-5 md:gap-5 gap-2'>
            {/* Left */}
            <div className='w-full flex flex-col gap-2'>
                {/* Showcase Manga */}
                <div className='grid md:grid-cols-[74%,25%] gap-2'>
                    {/* Top Mangas Carousel */}
                    <MangaCarousel />
                    {/* Top Manga Showcase */}
                    <FeaturedManga />
                </div>

                {/* Mangas */}
                <Mangas />
            </div>
            {/* Right */}
            <PopularMangas />
        </div>
    )
}

export default page