import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "MamawSensei",
  description: "Your Favorite Manga / Manhwa / Manhua / Webtoon In One Site.",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        {children}
        {/* <div className="pointer-events-none fixed left-1/2 top-1/2 h-4/5 w-4/5 translate-x-[-50%] translate-y-[-50%]">
          {modal}
        </div> */}
        <Footer />
      </body>
    </html>
  );
}
