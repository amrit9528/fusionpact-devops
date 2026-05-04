export interface Post {
  id: string;
  title: string;
  description?: string;
  video_link?: string;
  thumbnail_url: string;
  username: string;
  first_name: string;
  last_name: string;
  picture_url: string;
}

export interface Profile {
  name: string;
  username: string;
  bio: string;
  profile_picture_url: string;
  following_count: number;
  follower_count: number;
  post_count: number;
  posts: Post2[];
  user_type?: string;
  hourly_rate?: number;
  currency?: string;
}

export interface WorksGridProps {
  initialPosts: Post2[];
  username: string;
}

export interface Post2 {
  id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  video_link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
}

export interface BlogListResponse {
  count: number;
  data: BlogListItem[];
  success: boolean;
}

export interface BlogListItem {
  created_date: string;
  h1_title: string;
  image_alt: string;
  image_url: string;
  number: string;
  slug: string;
  title: string;
}

export interface BlogDetailResponse {
  data: {
    content: {
      faq_section: {
        for_employers: FAQ[];
        for_professionals: FAQ[];
      };
      featured_image: {
        alt: string;
        caption: string;
        dimensions: string;
        url: string;
      };
      h1_title: string;
      introduction: {
        target_keywords: string[];
        text: string;
      };
      main_sections: BlogSection[];
    };
    metadata: {
      title: string;
      meta_description: string;
      created_date: string;
    };
  };
  success: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface BlogSection {
  content: string;
  h2: string;
  subsections: {
    content: string;
    h3: string;
  }[];
}
