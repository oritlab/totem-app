// Banner de campanha no topo da listagem de uma categoria (/produtos/:slug).
// Na janela (início de startPhase → fim de endPhase), substitui o banner
// padrão da categoria. A arte já traz o texto, então o título da categoria
// não é exibido por cima.
/** @type {import("@/src/global/types/global").CategoryBannerCampaign[]} */
export const CategoryBannerCampaigns = [
  {
    id: "blackfriday-2026-novidades",
    categorySlug: "novidades",
    startPhase: "phase3",
    endPhase: "phase4",
    imageUrl: "https://orit.fbitsstatic.net/media/banner-bf-2026-totem.png?v=202609251746",
  },
];
