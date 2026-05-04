import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.socialverseapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "video-cdn.socialverseapp.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "seo.flichire.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "seo.flichire.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.socialverseapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flichire.com",
        port: "",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
