"use client";

import { CategoryBannerCampaigns } from "@/src/configurations/Campaign/CategoryBannerCampaigns";
import useCampaignAccessHook from "@/src/global/hooks/useCampaignAccessHook";
import { getActiveCampaign } from "@/src/global/utils/campaign";
import { CategoryBanner } from "../types";

// Troca o banner da categoria pelo de campanha quando houver um ativo pra ela.
// A arte da campanha já traz o texto — title vazio esconde o título/gradiente.
export default function useCategoryBannerCampaignHook(categorySlug: string | undefined, banner: CategoryBanner) {
  const campaignAccess = useCampaignAccessHook();

  const categoryCampaigns = CategoryBannerCampaigns.filter(function (campaign) {
    return campaign.categorySlug === categorySlug;
  });
  const bannerCampaign = campaignAccess.ready ? getActiveCampaign(categoryCampaigns, campaignAccess) : null;

  const categoryBanner: CategoryBanner = bannerCampaign
    ? {
        ...banner,
        imageUrl: bannerCampaign.imageUrl,
        title: "",
        subtitle: "",
        variant: "cover",
        hideOverlay: bannerCampaign.hideOverlay,
      }
    : banner;

  return { categoryBanner };
}
