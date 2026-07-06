import path from "path";
import type { NextConfig } from "next";

const totemCdnHost = new URL(process.env.NEXT_PUBLIC_TOTEM_CDN_HOST as string);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: totemCdnHost.protocol.replace(":", "") as "https",
        hostname: totemCdnHost.hostname,
        pathname: "/totem-images/**",
      },
    ],
  },
};

export default nextConfig;
