"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="h-[540px] sm:h-[630px] md:h-[780px] relative bg-black text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="relative max-w-[1420px] mx-auto flex items-end justify-center h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[300px] sm:h-full object-cover"
          >
            <source src="/video/Hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      <div className="relative h-full flex flex-col z-10">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="py-2 sm:py-4 px-3 sm:px-4 relative z-10"
        >
          <div className="max-w-[1440px] mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="h-8 sm:h-10 md:h-12 w-12 sm:w-16 md:w-20 relative"
            >
              <Image
                src="/logo/icon.png"
                alt="Flic"
                fill
                className="object-cover"
                priority
              />
            </Link>
            <div className="flex gap-3 sm:gap-4 md:gap-8 font-medium items-center text-sm sm:text-base">
              <Link
                href="#home"
                className="hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="#services"
                className="hover:opacity-80 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/jobs"
                className="hover:opacity-80 transition-opacity"
              >
                Jobs
              </Link>
              <Link
                href="/blog"
                className="hover:opacity-80 transition-opacity"
              >
                Blog
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.subverse.flic&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-semibold px-2.5 sm:px-3 py-1 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Download
              </Link>
            </div>
          </div>
        </motion.nav>

        <div
          className="flex-grow flex flex-col justify-center px-4 md:px-6"
          id="home"
        >
          <div className="max-w-3xl xl:max-w-[795px] mx-auto w-full flex flex-col justify-between h-full">
            <div className="space-y-5 sm:space-y-2 md:space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-start"
              >
                WHERE CREATORS
                <br />
                MEETS EMPLOYERS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base md:text-lg font-normal max-w-2xl"
              >
                Say goodbye to time consuming bidding wars and compromised
                quality. At Flic, editors and clients connect directly in a
                private, secure environment
                <br />
                to finalize deals seamlessly with a single swipe.
              </motion.p>
              <div className="flex justify-center items-center gap-4 lg:gap-6 w-fit">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.subverse.flic&pcampaignid=web_share",
                      "_blank"
                    );
                  }}
                  className="rounded-xl w-fit transition-colors"
                >
                  <Image
                    src="/playstore.png"
                    alt="Flic"
                    width={200}
                    height={100}
                    className="h-10 xl:h-11 w-32 xl:w-36"
                    priority
                  />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    window.open(
                      "https://apps.apple.com/in/app/flic-hire-editors-get-hired/id6740023994",
                      "_blank"
                    );
                  }}
                  className="rounded-xl w-fit"
                >
                  <Image
                    src="/appstore.png"
                    alt="Flic"
                    width={200}
                    height={100}
                    className="h-10 xl:h-11 w-32 xl:w-36"
                    priority
                  />
                </motion.button>
              </div>
            </div>

            <div className="relative w-full flex justify-center mt-8 px-4">
              {/* explore creators left top */}
              <div className="absolute left-0 top-6 sm:top-10 md:top-16 z-20 flex flex-col">
                <div className="flex items-center">
                  <div className="h-[2px] w-20 sm:w-32 bg-white/50" />
                  <div className="h-2 w-2 bg-white rounded-full" />
                </div>
                <p className="font-semibold xs:font-bold text-sm sm:text-lg md:text-2xl">
                  Explore
                </p>
                <p className="font-semibold xs:font-bold text-sm sm:text-lg md:text-2xl">
                  Creators
                </p>
              </div>

              {/* images container with stacking */}
              <div className="relative mx-auto h-52 xs:h-56 sm:h-72 md:h-96 w-[180px] xs:w-[200px] sm:w-[348px] md:w-[482px] flex items-end justify-between">
                {/* image 1 - behind */}
                <Image
                  src="/mobile1.png"
                  alt="screen1"
                  width={500}
                  height={500}
                  className="absolute rounded-t-lg h-32 xs:h-40 sm:h-64 md:h-80 w-24 xs:w-28 sm:w-48 md:w-64 bottom-0 left-0 z-10"
                />
                {/* image 2 - front */}
                <Image
                  src="/mobile2.png"
                  alt="screen2"
                  width={500}
                  height={500}
                  className="absolute rounded-t-lg h-32 xs:h-40 sm:h-64 md:h-[338px] w-24 xs:w-28 sm:w-[200px] md:w-64 bottom-0 right-0 z-20"
                />
              </div>

              {/* right side middle */}
              <div className="absolute right-0 bottom-2 sm:bottom-16 z-20 flex flex-col items-end">
                <p className="font-semibold xs:font-bold text-sm sm:text-lg md:text-2xl">
                  Connect
                </p>
                <p className="font-semibold xs:font-bold text-sm sm:text-lg md:text-2xl">
                  Effortlessly
                </p>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-white rounded-full" />
                  <div className="h-[2px] w-20 sm:w-32 bg-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
