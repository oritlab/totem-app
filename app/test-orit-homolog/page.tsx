import type { Metadata } from "next";

import Main from "@/src/CampaignHomolog/Main";

// Rota acessada só pela URL — fora de buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CampaignHomologPage() {
  return <Main />;
}
