"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/app/types";
import { useState } from "react";
import { getCurrencySymbol } from "@/app/utils/currency";

export default function ProfileHeader({
  profile,
}: {
  readonly profile: Profile;
}) {
  const [imageError, setImageError] = useState(false);
  const currencySymbol = getCurrencySymbol(profile.currency);

  return (
    <div className="flex flex-row gap-3 md:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="flex-shrink-0"
      >
        <Image
          src={imageError ? "/default-avatar.svg" : profile.profile_picture_url}
          alt={profile.name}
          width={150}
          height={150}
          className="rounded-full sm:h-40 sm:w-40 h-24 w-24"
          onError={() => setImageError(true)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1 }}
        className="flex-1"
      >
        <div className="flex items-baseline gap-x-2 md:mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {profile.name}
          </h1>
          {profile.user_type === "creator" && profile.hourly_rate && currencySymbol && (
            <span className="text-2xl sm:text-3xl font-bold flex items-baseline">
              <span className="text-white mx-1">|</span>
              <span className="text-green-500">{currencySymbol}</span>
              <span className="text-green-500">{profile.hourly_rate}</span>
              <span className="text-purple-600 ml-1 text-lg sm:text-xl">/ hr</span>
            </span>
          )}
        </div>
        <p className="text-gray-400 text-lg md:mb-4">@{profile.username}</p>
        <p className="text-gray-200 mb-3 md:mb-6">{profile.bio}</p>

        {/* Stats */}
        <div className="flex gap-4 md:gap-8 mb-3 md:mb-6">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold">
              {profile.following_count}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Connections
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold">
              {profile.follower_count}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Connectors</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold">
              {profile.post_count}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Works</div>
          </div>
        </div>

        <Link
          href="https://play.google.com/store/apps/details?id=com.subverse.flic"
          target="_blank"
          className="inline-block py-2 md:py-3 px-[115px] bg-purple-600 hover:bg-purple-700 
                   rounded-full font-semibold transition-all duration-300 
                   hover:-translate-y-0.5 hover:shadow-lg"
        >
          Hire Now
        </Link>
      </motion.div>
    </div>
  );
}
