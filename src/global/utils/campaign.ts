import { CampaignSchedule } from "@/src/configurations/Campaign/CampaignSchedule";
import { PriceDiscountCampaigns } from "@/src/configurations/Campaign/PriceDiscountCampaigns";
import { CampaignAccess, CampaignPhaseKey, CampaignWindow, ProductTag, ProductTagCampaign } from "../types/global";

// Início/fim de uma fase em epoch ms. Com homologação, usa a linha do tempo
// comprimida (offsets a partir do acesso); sem, as datas reais.
function getPhaseStart(phaseKey: CampaignPhaseKey, campaignAccess: CampaignAccess): number {
  if (campaignAccess.homolog && campaignAccess.homologGrantedAt !== null) {
    return campaignAccess.homologGrantedAt + CampaignSchedule.phasesHomolog[phaseKey].activatesAfterMs;
  }
  return Date.parse(CampaignSchedule.phasesProduction[phaseKey].activatesAt);
}

function getPhaseEnd(phaseKey: CampaignPhaseKey, campaignAccess: CampaignAccess): number {
  if (campaignAccess.homolog && campaignAccess.homologGrantedAt !== null) {
    return campaignAccess.homologGrantedAt + CampaignSchedule.phasesHomolog[phaseKey].expiresAfterMs;
  }
  return Date.parse(CampaignSchedule.phasesProduction[phaseKey].expiresAt);
}

// Janela de campanha: ativa do início de startPhase ao fim de endPhase
// (null = sem limite naquele lado).
export function isCampaignActive(campaign: CampaignWindow, campaignAccess: CampaignAccess): boolean {
  const started = campaign.startPhase === null || campaignAccess.now >= getPhaseStart(campaign.startPhase, campaignAccess);
  const notExpired = campaign.endPhase === null || campaignAccess.now <= getPhaseEnd(campaign.endPhase, campaignAccess);
  return started && notExpired;
}

export function getActiveCampaign<Campaign extends CampaignWindow>(
  campaigns: Campaign[],
  campaignAccess: CampaignAccess
): Campaign | null {
  return (
    campaigns.find(function (campaign) {
      return isCampaignActive(campaign, campaignAccess);
    }) ?? null
  );
}

// % de desconto de preço ativo agora pelo cronograma real (0 = sem desconto).
// Chamado no mapeamento da resposta da API, fora de hooks — por isso usa o
// relógio direto e ignora a homologação.
export function getActivePriceDiscountPercent(): number {
  const productionAccess: CampaignAccess = { ready: true, homolog: false, homologGrantedAt: null, now: Date.now() };
  return getActiveCampaign(PriceDiscountCampaigns, productionAccess)?.discountPercent ?? 0;
}

// Tag do produto: campanha ativa (e liberada pro acesso atual) que lista o
// sku ou alguma das categorias em que o produto está.
export function getProductTag(
  campaigns: ProductTagCampaign[],
  sku: string,
  categorySlugs: string[],
  campaignAccess: CampaignAccess
): ProductTag | undefined {
  const campaign = campaigns.find(function (tagCampaign) {
    if (tagCampaign.homologOnly && !campaignAccess.homolog) return false;
    if (!isCampaignActive(tagCampaign, campaignAccess)) return false;
    if (tagCampaign.productSkus.includes(sku)) return true;
    return tagCampaign.categorySlugs.some(function (categorySlug) {
      return categorySlugs.includes(categorySlug);
    });
  });

  return campaign?.tag;
}
