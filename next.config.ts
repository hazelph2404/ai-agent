import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    // disable next.js dev tools overlay
    nextScriptWorkers: false,
    serverActions: {
      allowedOrigins: [],
    },
    turbo: {
      resolveModuleFallbacks: false,
    },
    ppr: false,
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
