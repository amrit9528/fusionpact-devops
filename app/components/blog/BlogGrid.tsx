"use client";

import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { BlogListItem } from "@/app/types";

interface BlogGridProps {
  posts: BlogListItem[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  // console.log("BlogGrid rendering with posts:", posts);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts?.map((post, index) => {
        return <BlogCard key={post.number} postNumber={post.number} post={post} index={index} />;
      })}
    </motion.div>
  );
}
