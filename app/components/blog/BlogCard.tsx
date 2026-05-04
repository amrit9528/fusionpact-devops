"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogListItem } from "@/app/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface BlogCardProps {
  post: BlogListItem;
  index: number;
  postNumber: string;
}

export default function BlogCard({ post, index, postNumber }: BlogCardProps) {
  // console.log("BlogCard rendering:", { post, index });
  return (
    <motion.div
      key={postNumber}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white/5 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
          <div className="h-48 w-full relative overflow-hidden">
            <LazyLoadImage
              src={post.image_url}
              alt={post.image_alt}
              className="object-cover w-full h-full"
              effect="blur"
              wrapperClassName="w-full h-full"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-2">
              {post.h1_title}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="text-sm text-zinc-500">{post.created_date}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
