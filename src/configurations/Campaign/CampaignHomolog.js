// Homologação em produção: quem acessa a rota abaixo (só pela URL, sem link
// no app) recebe o token no localStorage e passa a ver as campanhas numa
// linha do tempo comprimida (CampaignSchedule.phasesHomolog), contada a
// partir do acesso. Sem token, vale o cronograma real (phasesProduction).
//
// O acesso dura ttlMs; depois disso é preciso acessar a rota de novo.
// Valor gravado: JSON { token, grantedAt, expiresAt } (epoch ms).
export const CampaignHomolog = {
  route: "/test-orit-homolog",
  storageKey: "OritCampaignHomolog",
  token: "orit-homolog-2026",
  ttlMs: 60 * 60 * 1000, // 1 hora
};
