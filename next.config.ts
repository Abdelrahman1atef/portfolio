import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.213.1'],
  // No rewrites needed as API is now integrated into Next.js routes
};

export default nextConfig;
