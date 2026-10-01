// Tags de produto (listagem + detalhe). Vale a primeira campanha ativa que
// se aplica ao produto — ou seja, dentro da janela (início de startPhase →
// fim de endPhase) E o produto está em productSkus OU pertence a uma das
// categorySlugs.
//
// homologOnly → só aparece pra quem tem o token de homologação (sem token,
//               nenhum produto recebe a tag, mesmo dentro da janela)
/** @type {import("@/src/global/types/global").ProductTagCampaign[]} */
export const ProductTagCampaigns = [
  {
    id: "blackfriday-2026-10off",
    startPhase: "phase3",
    endPhase: "phase4",
    tag: { text: "10% OFF", backgroundColor: "#000000", textColor: "#FFFFFF" },
    productSkus: [],
    categorySlugs: ["novidades"],
    homologOnly: true,
  },
];
