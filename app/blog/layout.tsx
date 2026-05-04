import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Flic",
  description:
    "Discover expert guides, tutorials, and insights about video editing, content creation, and industry trends. Learn how to grow your social media presence with Flic.",
  keywords: [
    "video editing blog",
    "content creation tips",
    "social media guides",
    "video editor resources",
    "content creator community",
    "flic blog",
    "freelance video editing",
    "video production insights",
  ],
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: "https://flichire.com/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flichire.com/blog",
    siteName: "Flic",
    title: "Flic Blog ",
    description:
      "Latest updates, guides and stories about video editing and content creation from industry experts. Grow your skills and career with Flic.",
    images: [
      {
        url: "https://flichire.com/meta.jpeg",
        width: 1200,
        height: 630,
        alt: "Flic Blog for Video Editors and Content Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@flichire",
    title: "Flic Blog - Video Editing & Content Creation Resources",
    description: "Expert guides and insights for video editors and content creators",
    images: ["https://flichire.com/meta.jpeg"],
  },
  other: {
    "google-site-verification": "zBsu5vTiV3pkoH97D_hdMChQSJ9fkO5Ho_8JwoGP9ms",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
