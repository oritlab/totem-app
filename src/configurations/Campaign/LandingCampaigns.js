// Landings de campanha. Fora da janela (início de startPhase → fim de
// endPhase, ver CampaignSchedule.js) a rota redireciona pra home.
/** @type {import("@/src/global/types/global").LandingCampaign[]} */
export const LandingCampaigns = [
  {
    id: "blackfriday-2026-cadastro",
    route: "/private-sale",
    formId: "cadastro-blackfriday-2026-totem",
    heroImage: "https://orit.fbitsstatic.net/media/form-sale-2026-totem.png?v=202609251640",
    startPhase: "phase1",
    endPhase: "phase2",
  },
];
