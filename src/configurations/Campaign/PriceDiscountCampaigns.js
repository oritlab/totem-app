// Desconto de preço calculado no front (quando o preço promocional não vem
// preenchido no backend). Na janela (início de startPhase → fim de endPhase),
// aplica discountPercent em todas as peças: preço "de/por", Pix e parcelas
// recalculados e selo "% OFF". Fora dela, preço normal do backend.
//
// Avaliado sempre pelo cronograma real (phasesProduction), inclusive pra quem
// tem token de homologação — preço não entra na linha do tempo de teste.
/** @type {import("@/src/global/types/global").PriceDiscountCampaign[]} */
export const PriceDiscountCampaigns = [
  {
    id: "dia-do-cliente-2026",
    startPhase: "phase0",
    endPhase: "phase0",
    discountPercent: 10,
  },
];
