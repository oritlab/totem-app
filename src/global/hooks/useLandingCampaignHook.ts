"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LandingCampaigns } from "@/src/configurations/Campaign/LandingCampaigns";
import useCampaignAccessHook from "@/src/global/hooks/useCampaignAccessHook";
import { LandingCampaign } from "@/src/global/types/global";
import { isCampaignActive } from "@/src/global/utils/campaign";

// Guarda de landing de campanha: fora da janela (e sem token de homologação
// antes da ativação) redireciona pra home. O id precisa existir em LandingCampaigns.
export default function useLandingCampaignHook(landingId: string) {
  const router = useRouter();
  const campaignAccess = useCampaignAccessHook();
  const landingCampaign = LandingCampaigns.find(function (campaign) {
    return campaign.id === landingId;
  }) as LandingCampaign;

  const landingAccess = {
    ready: campaignAccess.ready,
    allowed: campaignAccess.ready && isCampaignActive(landingCampaign, campaignAccess),
  };

  // Exceção consciente ao "useEffect só pro GET inicial": navegação é efeito
  // colateral e só pode rodar no cliente, depois de ler o acesso.
  useEffect(
    function () {
      if (!landingAccess.ready) return;
      if (landingAccess.allowed) return;
      router.replace("/");
    },
    [landingAccess.ready, landingAccess.allowed, router]
  );

  return { landingCampaign, landingAccess };
}
