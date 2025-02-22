// TODO(Omkar): Add PWA support
// import PWA from "next-pwa";
// const withPWA = PWA({
//   dest: "public",
//   disable: env.NODE_ENV === "development",
// });

import { type NextConfig } from "next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env";

import "./src/check-assets";

const config: NextConfig = {
  distDir: process.env.BUILD_DIR ?? ".next",

  experimental: {
    // typedRoutes: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.incridea.in",
      },
      {
        protocol: "https",
        hostname: "*.utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },

  reactStrictMode: true,
};

export default config;
