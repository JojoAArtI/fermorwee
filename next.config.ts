import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    // One small stylesheet: inline it so it doesn't block first paint.
    inlineCss: true,
  },
};

export default nextConfig;
