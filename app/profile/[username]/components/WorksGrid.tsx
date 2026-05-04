"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchUserPosts } from "@/app/utils/api";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import dynamic from "next/dynamic";
import { Post2 } from "@/app/types";

const VideoModal = dynamic(() => import("./VideoModal"), { ssr: false });

// Add interfaces for API response data
interface ApiPost {
  id: number;
  title: string;
  description?: string;
  thumbnail_url: string;
  picture_url?: string;
  video_link?: string;
}

interface ApiPostsResponse {
  posts: ApiPost[];
}

export default function WorksGrid({
  initialPosts,
  username,
}: {
  readonly initialPosts: Post2[];
  readonly username: string;
}) {
  const [posts, setPosts] = useState<Post2[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadedPostIds = useRef(new Set(initialPosts.map((post) => post.id)));
  const observerTarget = useRef(null);
  const [selectedPost, setSelectedPost] = useState<Post2 | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const data = await fetchUserPosts(username, currentPage);
      const postsData = data as ApiPostsResponse;

      if (!postsData.posts || postsData.posts.length === 0) {
        setHasMore(false);
        return;
      }

      // Map API response to Post2 interface
      const mappedPosts = postsData.posts.map((post: ApiPost) => ({
        id: post.id.toString(),
        title: post.title || "Untitled",
        description: post.description || "",
        thumbnail_url: post.thumbnail_url || post.picture_url || "/default-thumbnail.svg",
        video_link: post.video_link || "",
      }));

      const newPosts = mappedPosts.filter(
        (post: Post2) => !loadedPostIds.current.has(post.id)
      );
      newPosts.forEach((post: Post2) => loadedPostIds.current.add(post.id));
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);

      if (newPosts.length > 0) {
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasMore, isLoading, username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMorePosts]);

  return (
    <>
      <div className="mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-[9/16] rounded-lg overflow-hidden group bg-transparent border-0 p-0 w-full"
            >
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-thumbnail.svg";
                }}
              />
              {post.video_link && (
                <video
                  src={post.video_link}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300
                           hidden md:block"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="none"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.currentTarget.play();
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-medium truncate">
                    {post.title || "Untitled"}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
        {hasMore && (
          <div
            ref={observerTarget}
            className="h-20 flex items-center justify-center mt-8"
          >
            {isLoading && <LoadingAnimation width={100} height={100} />}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isMounted && selectedPost && (
        <VideoModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}
