"use client";

import { useState, useEffect } from "react";
import AnimatedNav from "../components/navigation/AnimatedNav";
import BlogGrid from "../components/blog/BlogGrid";
import { fetchBlogList } from "../utils/api";
import LoadingAnimation from "@/app/components/LoadingAnimation";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBlogPosts() {
    try {
      setLoading(true);
      const response = await fetchBlogList();
      setPosts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading blog posts:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogPosts();

    // Set up auto-refresh every 5 minutes (300000ms)
    const refreshInterval = setInterval(() => {
      loadBlogPosts();
    }, 300000);

    // Clean up the interval when component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <AnimatedNav bgColor="bg-white/5" />
      <main className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-zinc-400 text-lg mb-12">
            Latest updates, guides and stories about video editing and content
            creation
          </p>

          {loading ? (
            <div className="text-white text-xl flex justify-center py-12">
              <LoadingAnimation width={100} height={100} />
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </main>
    </div>
  );
}
