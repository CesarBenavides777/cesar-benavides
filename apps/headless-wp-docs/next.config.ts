import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    serverActions: {
      bodySizeLimit: "10mb",
    },
    reactCompiler: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
