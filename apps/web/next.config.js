import { withFaust } from "@faustwp/core";
import { createSecureHeaders } from "next-secure-headers";

/** @type {import('next').NextConfig} */
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
    reactCompiler: true,
  },
  trailingSlash: false,
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
});
