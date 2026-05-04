import { Metadata } from "next";
import Testimonials from "./components/home/Testimonials";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import Hero from "./components/home/Hero";
import BelowHero from "./components/home/BelowHero";
// import InteractiveGallery from "./components/InteractiveGallery";

export const metadata: Metadata = {
  title: "Flic | Hire Editors Get Hired",
  description:
    "The ultimate hiring platform for video editors, creators & Clients can find top-tier editors and creators with a single swipe.",
  openGraph: {
    title: "Flic | Hire Editors Get Hired",
    description:
      "The ultimate hiring platform for video editors, creators & Clients can find top-tier editors and creators with a single swipe.",
    images: [
      {
        url: "https://flichire.com/meta.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="relative bg-black">
      <Hero />
      <BelowHero />
      <Testimonials />
      {/* Future Feature in Pending */}
      {/* <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Interactive Photo Gallery
          </h2>
          <InteractiveGallery />
        </div>
      </section> */}
    </div>
  );
}
