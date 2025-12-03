import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 75, 100],
  },
  devIndicators:false,
  eslint: {
    ignoreDuringBuilds: true,
  }

};

export default nextConfig;


