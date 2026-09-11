import path from "path";
import type { NextConfig } from "next";

const totemCdnHost = new URL(process.env.NEXT_PUBLIC_TOTEM_CDN_HOST as string);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Necessário pros banners de campanha em SVG (public/totem-home.svg,
    // public/totem-ct-promocao.svg) — o texto vem como vetor no export do
    // Figma, só assim fica nítido. O CSP restringe o SVG a não executar
    // script/estilo embutido, mitigando o risco de XSS que a flag libera.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
