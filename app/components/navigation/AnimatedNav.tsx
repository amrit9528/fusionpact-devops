"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedNav({
  bgColor,
  variant,
}: {
  bgColor: string;
  variant?: "default" | "blog";
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 max-w-[1440px] mx-auto left-0 right-0 z-50 backdrop-blur-lg border border-white/20 rounded-b-2xl px-4 py-3 md:px-6 md:py-4 flex justify-between items-center ${bgColor}`}
    >
      <div className="flex items-center">
        <Link
          href="/"
          className="h-8 sm:h-10 md:h-12 w-12 sm:w-16 md:w-20 relative mr-6"
        >
          <Image
            src="/logo/icon.png"
            alt="Flic Logo"
            fill
            className="object-cover"
            priority
          />
        </Link>
      </div>

      {variant === "blog" ? (
        <div className="flex items-center gap-4">
          {variant === "blog" && (
            <div className="hidden sm:flex items-center space-x-6">
              <Link
                href="/"
                className="text-white hover:text-primary transition-colors ease-in-out duration-300"
              >
                Home
              </Link>
              <Link
                href="/#services"
                className="text-white hover:text-primary transition-colors ease-in-out duration-300"
              >
                About
              </Link>
            </div>
          )}
          <Link
            href="https://play.google.com/store/apps/details?id=com.subverse.flic&pcampaignid=web_share"
            target="_blank"
            className="bg-white text-black font-semibold px-6 py-2
                    rounded-full transition-all duration-300 hover:-translate-y-0.5
                    hover:shadow-lg hover:shadow-primary/25"
          >
            Download
          </Link>
        </div>
      ) : (
        <Link
          href="/"
          className="bg-white text-black font-semibold px-6 py-2 
                    rounded-full transition-all duration-300 hover:-translate-y-0.5
                    hover:shadow-lg hover:shadow-primary/25"
        >
          Back to Home
        </Link>
      )}
    </motion.nav>
  );
}
