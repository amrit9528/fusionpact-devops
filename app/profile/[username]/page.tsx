import { Metadata } from "next";
import { Suspense } from "react";
import { fetchUserProfile, fetchUserPosts } from "@/app/utils/api";
import { Profile } from "@/app/types";
import ProfileHeader from "./components/ProfileHeader";
import WorksGrid from "./components/WorksGrid";

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

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ readonly username: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = await getProfile(resolvedParams.username);

  return {
    title: `${profile.name} | Flic`,
    description: `Check out ${profile.name}'s profile on Flic`,
    openGraph: {
      title: `${profile.name} | Flic`,
      description: `Check out ${profile.name}'s profile on Flic`,
      images: [
        {
          url: profile.profile_picture_url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

async function getProfile(username: string): Promise<Profile> {
  try {
    const [profileData, postsData] = await Promise.all([
      fetchUserProfile(username),
      fetchUserPosts(username, 1),
    ]);

    // Map the posts data to match our Post2 interface
    const mappedPosts = (postsData as ApiPostsResponse).posts?.map((post: ApiPost) => ({
      id: post.id.toString(),
      title: post.title || "Untitled",
      description: post.description || "",
      thumbnail_url: post.thumbnail_url || post.picture_url || "/default-thumbnail.svg",
      video_link: post.video_link || "",
    })) || [];

    return {
      name: profileData.name || `${profileData.first_name} ${profileData.last_name}`.trim(),
      username: profileData.username,
      bio: profileData.bio || "",
      profile_picture_url: profileData.profile_picture_url || "/default-avatar.svg",
      following_count: profileData.following_count || 0,
      follower_count: profileData.follower_count || 0,
      post_count: profileData.post_count || 0,
      posts: mappedPosts,
      user_type: profileData.user_type,
      hourly_rate: profileData.hourly_rate,
      currency: profileData.currency,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      name: "User not found",
      username: username,
      bio: "",
      profile_picture_url: "/default-avatar.svg",
      following_count: 0,
      follower_count: 0,
      post_count: 0,
      posts: [],
      user_type: undefined,
      hourly_rate: 0,
      currency: undefined,
    };
  }
}

export default async function ProfilePage({
  params,
}: {
  readonly params: Promise<{ readonly username: string }>;
}) {
  const resolvedParams = await params;
  const profile = await getProfile(resolvedParams.username);

  return (
    <>
      <ProfileHeader profile={profile} />

      {/* Works Grid */}
      <Suspense fallback={<div>Loading works...</div>}>
        <WorksGrid initialPosts={profile.posts} username={profile.username} />
      </Suspense>
    </>
  );
}
