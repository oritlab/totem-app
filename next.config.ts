import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orit.fbitsstatic.net",
      },
      {
        protocol: "https",
        hostname: "vender.orit.com.br",
      },
    ],
  },
};

export default nextConfig;
