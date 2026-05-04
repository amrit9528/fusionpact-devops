import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | Flic - Hire Expert Video Editors",
  description:
    "Browse freelance and full-time video editing jobs. Find opportunities for video editors, motion graphics designers, and animators on Flic.",
  keywords: [
    "video editing jobs",
    "freelance video editor",
    "motion graphics jobs",
    "animation jobs",
    "video production work",
    "hire video editors",
    "video editing career",
    "flic jobs",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://flichire.com/jobs",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flichire.com/jobs",
    siteName: "Flic",
    title: "Video Editing Jobs - Flic",
    description:
      "Find top video editing jobs and opportunities for content creators. Apply for freelance and full-time positions on Flic.",
    images: [
      {
        url: "https://flichire.com/meta.jpeg",
        width: 1200,
        height: 630,
        alt: "Flic Jobs - Video Editing Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@flichire",
    title: "Video Editing Jobs - Flic",
    description: "Find top video editing opportunities on Flic",
    images: ["https://flichire.com/meta.jpeg"],
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
