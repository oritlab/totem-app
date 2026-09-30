import path from "path";
import type { NextConfig } from "next";

const totemCdnHost = new URL(process.env.NEXT_PUBLIC_TOTEM_CDN_HOST as string);

const nextConfig: NextConfig = {
  // Só afeta `next dev`: libera o totem a acessar o dev server pelo IP da rede.
  // Sem isso o Next bloqueia os assets de dev e a página não hidrata (nenhum clique funciona).
  allowedDevOrigins: ["10.100.0.62"],
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
      {
        protocol: totemCdnHost.protocol.replace(":", "") as "https",
        hostname: totemCdnHost.hostname,
        pathname: "/totem-images/**",
      },
    ],
  },
};

export default nextConfig;
