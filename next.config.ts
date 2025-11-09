import type { NextConfig } from "next";

/**
 * Get PocketBase image domains from environment variable
 * Supports both development and production URLs
 */
function getPocketBaseImageConfig() {
  const pocketbaseUrl =
    process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

  try {
    const url = new URL(pocketbaseUrl);
    const protocol = url.protocol.replace(":", "") as "http" | "https";
    const hostname = url.hostname;
    const port = url.port;

    return {
      protocol,
      hostname,
      port,
      pathname: "/api/files/**",
    };
  } catch {
    console.warn(
      "Invalid NEXT_PUBLIC_POCKETBASE_URL, using default localhost configuration",
    );
    return {
      protocol: "http" as const,
      hostname: "127.0.0.1",
      port: "8090",
      pathname: "/api/files/**",
    };
  }
}

const nextConfig: NextConfig = {
  // Enable Next.js 15 caching mechanisms
  // cacheComponents: true,
  // reactCompiler: true, // Temporarily disabled for Docker build compatibility
  output: "standalone",

  // Enable experimental caching features
  experimental: {
    // turbopackFileSystemCacheForDev: true,
    cacheLife: {
      default: {
        stale: 3600, // 1 hour
        revalidate: 60, // 1 minute
        expire: 86400, // 24 hours
      },
    },
  },

  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      // PocketBase image configuration (dynamic based on environment)
      getPocketBaseImageConfig(),
      // Fallback for localhost development
      {
        protocol: "http",
        hostname: "localhost",
        port: "8090",
        pathname: "/api/files/**",
      },
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
    // Image optimization settings
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable static generation where possible
  generateBuildId: async () => {
    // Use git commit hash in production, timestamp in development
    if (
      process.env.NODE_ENV === "production" &&
      process.env.VERCEL_GIT_COMMIT_SHA
    ) {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    }
    return `build-${Date.now()}`;
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
