/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you have other configurations, they will go here
  // For example: reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.socialverseapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'video-cdn.socialverseapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'socialverse-assets.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/ios',
        destination: 'https://apps.apple.com/md/app/flic-hire-editors-get-hired/id6740023994',
        permanent: false, // Use false for temporary/app store redirects
      },
      {
        source: '/android',
        destination: 'https://play.google.com/store/apps/details?id=com.subverse.flic',
        permanent: false, // Use false for temporary/app store redirects
      },
    ]
  },
};

module.exports = nextConfig; 