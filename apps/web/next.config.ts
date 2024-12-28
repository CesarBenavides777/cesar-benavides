import { getWpHostname, withFaust } from "@faustwp/core";
import type { NextConfig } from "next";
import { createSecureHeaders } from "next-secure-headers";

export default withFaust({
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
  sassOptions: {
    includePaths: ["node_modules"],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/:splat*",
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/:splat*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders({
          xssProtection: false,
        }),
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
}) as NextConfig;
