import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Next.js 15 caching mechanisms
  cacheComponents: true,
  // reactCompiler: true, // Temporarily disabled for Docker build compatibility
  output: 'standalone',

  // Enable experimental caching features
  experimental: {
    // turbopackFileSystemCacheForDev: true,
    cacheLife: {
      'default': {
        stale: 3600, // 1 hour
        revalidate: 60, // 1 minute
        expire: 86400, // 24 hours
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable static generation where possible
  generateBuildId: async () => {
    return 'build-cache-' + Date.now()
  },
};

export default nextConfig;
