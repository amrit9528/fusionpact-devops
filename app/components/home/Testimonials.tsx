"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Mousewheel } from "swiper/modules";
import { Icon } from "@iconify/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    quote:
      "Finding a skilled editor was never this easy! Swiping through portfolios and hiring instantly saved me so much time. Highly recommended!",
    author: "Sarah M.",
    role: "Content Creator",
    image: "/testimonials/Sarah.jpg",
  },
  {
    id: 2,
    quote:
      "This app made hiring effortless. I connected with a top-notch video editor in minutes, and the project was completed perfectly!",
    author: "James R.",
    role: "Startup Founder",
    image: "/testimonials/James.jpg",
  },
  {
    id: 3,
    quote:
      "Finally, a simple way to hire talented creators! The swipe feature is genius, and managing projects is a breeze.",
    author: "Emily K.",
    role: "YouTuber",
    image: "/testimonials/Emily.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[520px] md:h-[820px] overflow-hidden flex justify-center items-center bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-fit md:w-full max-w-8xl h-[340px] sm:h-[500px] md:h-full object-cover"
      >
        <source src="/video/testimonial.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>

      {/* Navigation Buttons */}
      <button className="absolute left-4 md:left-8 z-20 cursor-pointer testimonial-button-prev">
        <Icon icon="iconamoon:arrow-left-2" className="text-2xl text-white" />
      </button>
      <button className="absolute right-4 md:right-8 z-20 cursor-pointer testimonial-button-next">
        <Icon icon="iconamoon:arrow-right-2" className="text-2xl text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-fit flex justify-center items-center flex-col w-full max-w-6xl mx-auto px-4">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
            Testimonials
          </h2>
          <p className="text-white/80 text-xs sm:text-base md:text-lg">
            Discover the amazing stories and experiences from our users who have
            achieved incredible results and opportunities with our platform
          </p>
        </div>
        <div className="flex items-center justify-center h-[265px] sm:h-[340px] md:h-full md:min-h-[510px]">
          <Swiper
            modules={[Autoplay, Navigation, Mousewheel]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
            }}
            navigation={{
              prevEl: ".testimonial-button-prev",
              nextEl: ".testimonial-button-next",
            }}
            className="w-full max-w-3xl h-[340px] sm:h-[500px] md:h-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial.id}
                className="pt-[5%] sm:pt-[10%] md:pt-[0%]"
              >
                <div className="flex flex-col items-center max-w-lg mx-auto text-center px-4 py-8">
                  <div className="flex justify-center items-center w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 sm:mb-4 md:mb-6">
                    <Image
                      src={testimonial.image}
                      alt="Testimonial"
                      width={100}
                      height={100}
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={"/logo/logo.png"}
                      overrideSrc={"/logo/logo.png"}
                    />
                  </div>
                  <blockquote className="text-white text-xs max-w-xs sm:max-w-lg md:max-w-xl sm:text-sm md:text-lg text-wrap md:mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-white">
                    <p className="text-sm sm:text-lg mb-2 sm:mb-4 md:mb-12">
                      Thank you
                    </p>
                    <p className="text-white/80 text-sm sm:text-base md:mb-2 font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-white/60 text-xs sm:text-base ">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
