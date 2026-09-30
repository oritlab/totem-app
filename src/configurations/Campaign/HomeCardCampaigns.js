// Primeiro card da home. Vale o primeiro item ativo da lista; se nenhum
// estiver ativo, cai no HomeCardDefault. Janela = início de startPhase até o
// fim de endPhase (ver CampaignSchedule.js).
//
// action.type:
//   "landing" → abre uma landing de campanha (ver LandingCampaigns.js)
//   "link"    → navega pra qualquer rota do app (ex: listagem)
/** @type {import("@/src/global/types/global").HomeCardCampaign[]} */
export const HomeCardCampaigns = [
  {
    id: "dia-do-cliente-2026",
    startPhase: "phase0",
    endPhase: "phase0",
    image: "/totem-home.svg",
    alt: "Dia do Cliente — Escolhas Orit",
    action: { type: "link", href: "/produtos/escolhas-orit" },
  },
  {
    id: "blackfriday-2026-cadastro",
    startPhase: "phase1",
    endPhase: "phase2",
    image: "https://orit.fbitsstatic.net/media/card-sale-2026-totem.png?v=202609251647",
    alt: "Private Sale Black Friday — cadastre-se",
    action: { type: "landing", href: "/private-sale" },
  },
  {
    id: "blackfriday-2026",
    startPhase: "phase3",
    endPhase: "phase4",
    image: "https://orit.fbitsstatic.net/media/card-bf-2026-totem.png?v=202609251746",
    alt: "Black Friday — o melhor negócio o ano inteiro",
    action: { type: "link", href: "/produtos/novidades" },
  },
];

/** @type {import("@/src/global/types/global").HomeCardCampaign} */
export const HomeCardDefault = {
  id: "default",
  startPhase: null,
  endPhase: null,
  image: "/escolhas-orit-home.jpg",
  alt: "Escolhas Orit",
  action: { type: "link", href: "/produtos/escolhas-orit" },
};
