// Banner de campanha no topo da listagem de uma categoria (/produtos/:slug).
// Na janela (início de startPhase → fim de endPhase), substitui o banner
// padrão da categoria. A arte já traz o texto, então o título da categoria
// não é exibido por cima.
//
// hideOverlay → sem o gradiente escuro por cima da arte
/** @type {import("@/src/global/types/global").CategoryBannerCampaign[]} */
export const CategoryBannerCampaigns = [
  {
    id: "dia-do-cliente-2026-escolhas-orit",
    categorySlug: "escolhas-orit",
    startPhase: "phase0",
    endPhase: "phase0",
    imageUrl: "/totem-ct-promocao.svg",
    hideOverlay: false,
  },
  {
    id: "blackfriday-2026-novidades",
    categorySlug: "novidades",
    startPhase: "phase3",
    endPhase: "phase4",
    imageUrl: "https://orit.fbitsstatic.net/media/banner-bf-2026-totem.png?v=202609251746",
    hideOverlay: true,
  },
];
