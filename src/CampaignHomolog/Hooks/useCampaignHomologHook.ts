"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CampaignHomolog } from "@/src/configurations/Campaign/CampaignHomolog";

export default function useCampaignHomologHook() {
  const router = useRouter();

  // Ao montar: grava o token de homologação (válido por ttlMs) e devolve pra
  // home. A linha do tempo comprimida (phasesHomolog) começa a contar agora —
  // acessar de novo reinicia o teste do zero.
  useEffect(
    function () {
      try {
        const grantedAt = Date.now();
        const homologAccess = {
          token: CampaignHomolog.token,
          grantedAt,
          expiresAt: grantedAt + CampaignHomolog.ttlMs,
        };
        window.localStorage.setItem(CampaignHomolog.storageKey, JSON.stringify(homologAccess));
      } catch {
        // localStorage indisponível (modo privado/bloqueado): segue sem homologação.
      }
      router.replace("/");
    },
    [router]
  );
}
