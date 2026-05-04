import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Video Editing: A Beginner's Guide",
    slug: "art-of-video-editing",
    excerpt:
      "Learn the fundamentals of video editing and start your journey as a content creator.",
    content: "Full blog content here...",
    coverImage: "/blog/video-editing.jpg",
    date: "March 15, 2024",
    readTime: 5,
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
  },
  {
    id: "2",
    title: "10 Tips for Growing Your YouTube Channel",
    slug: "youtube-growth-tips",
    excerpt:
      "Discover proven strategies to grow your YouTube channel and engage with your audience.",
    content: "Full blog content here...",
    coverImage: "/blog/youtube-tips.jpg",
    date: "March 12, 2024",
    readTime: 8,
    author: {
      name: "Jane Smith",
      avatar: "/avatars/jane.jpg",
    },
  },
  // Add more blog posts...
];
