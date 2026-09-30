// Cronograma central das campanhas do totem — fonte única de datas.
// Os itens de campanha (HomeCardCampaigns, LandingCampaigns...) nunca têm
// datas próprias: apontam pra fases daqui via startPhase/endPhase.
//
// phasesProduction: datas reais, ISO 8601 com fuso explícito (-03:00) — o
//   resultado é o mesmo independente do fuso do servidor ou do totem.
// phasesHomolog: linha do tempo comprimida pra quem tem o token de
//   homologação (ver CampaignHomolog.js). Offsets em ms contados a partir do
//   momento em que a pessoa acessou a rota de homologação.
const MINUTE = 60 * 1000;

export const CampaignSchedule = {
  phasesProduction: {
    phase1: { title: "Captação", activatesAt: "2026-10-01T08:00:00-03:00", expiresAt: "2026-10-13T07:59:59-03:00" },
    phase2: { title: "Private Sale", activatesAt: "2026-10-13T08:00:00-03:00", expiresAt: "2026-11-03T07:59:59-03:00" },
    phase3: { title: "Black Friday 30%", activatesAt: "2026-11-03T08:00:00-03:00", expiresAt: "2026-12-01T07:59:59-03:00" },
    phase4: { title: "Black Friday 50%", activatesAt: "2026-11-23T08:00:00-03:00", expiresAt: "2026-12-01T07:59:59-03:00" },
  },
  phasesHomolog: {
    phase1: { title: "Captação", activatesAfterMs: 0, expiresAfterMs: 2.5 * MINUTE },
    phase2: { title: "Private Sale", activatesAfterMs: 2.5 * MINUTE, expiresAfterMs: 5 * MINUTE },
    phase3: { title: "Black Friday 30%", activatesAfterMs: 5 * MINUTE, expiresAfterMs: 60 * MINUTE },
    phase4: { title: "Black Friday 50%", activatesAfterMs: 30 * MINUTE, expiresAfterMs: 60 * MINUTE },
  },
};
