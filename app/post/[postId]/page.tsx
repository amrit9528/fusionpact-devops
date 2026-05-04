import { Metadata } from "next";
import { Suspense } from "react";
import { fetchPost } from "@/app/utils/api";
import VideoPlayer from "./components/VideoPlayer";
import { Post } from "@/app/types";
import AnimatedNav from "@/app/components/navigation/AnimatedNav";

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ readonly postId: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.postId);

  return {
    title: `${post.title} by ${post.first_name} ${post.last_name}`,
    description: post.description,
    openGraph: {
      title: `${post.title} by ${post.first_name} ${post.last_name}`,
      description: post.description,
      images: [{ url: post.thumbnail_url, width: 1200, height: 630 }],
    },
  };
}

async function getPost(postId: string): Promise<Post> {
  try {
    const data = await fetchPost(postId);
    console.log(data);
    return data.post[0];
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Post not found");
  }
}

export default async function PostPage({
  params,
}: {
  readonly params: Promise<{ readonly postId: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.postId);

  return (
    <div className="bg-black text-white py-6">
      {/* Navigation */}
      <AnimatedNav bgColor="bg-black/70" variant="default" />

      {/* Video Player */}
      <Suspense fallback={<div>Loading video...</div>}>
        <VideoPlayer post={post} />
      </Suspense>

      {/* App Download Button */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.subverse.flic"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-purple-600 text-white text-center py-4 rounded-xl
                   font-semibold hover:bg-purple-700 transition-colors"
        >
          Get it on Play Store
        </a>
      </div>
    </div>
  );
}
