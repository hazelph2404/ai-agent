/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
