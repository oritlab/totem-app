"use client";

import { HomeCardCampaigns, HomeCardDefault } from "@/src/configurations/Campaign/HomeCardCampaigns";
import useCampaignAccessHook from "@/src/global/hooks/useCampaignAccessHook";
import { getActiveCampaign } from "@/src/global/utils/campaign";
import { HomeCardCampaign } from "../types";

export default function useHomeCampaignHook() {
  const campaignAccess = useCampaignAccessHook();

  // Até ler o acesso no cliente, o card fica só com o fundo (sem imagem) —
  // evita piscar o card padrão pra quem tem token de homologação.
  const homeCard: HomeCardCampaign = campaignAccess.ready
    ? (getActiveCampaign(HomeCardCampaigns, campaignAccess) ?? HomeCardDefault)
    : { ...HomeCardDefault, image: "" };

  return { homeCard };
}
