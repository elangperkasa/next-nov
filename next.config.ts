import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '/**',  // Allow images from dummyjson.com
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',  // Allow images from cdn.dummyjson.com
      },
    ],
  },
};

export default nextConfig;
