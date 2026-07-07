import { ProdutoData } from "../types";

export default function useProdutoHook() {
  const produto: ProdutoData = {
    reference: "1063124",
    badge: "ÚNICA PEÇA",
    promotionBadge: "PROMOÇÃO",
    brand: "Bulgari",
    title: "Relógio Bulgari Bulgari Diagono",
    category: "Relógios",
    originalPrice: "R$ 119.990,00",
    price: "R$ 105.990,00",
    installment: "ou em até 10x de R$ 10.599,00",
    pixPrice: "R$ 95.990,00",
    images: [
      { src: "/relogio-bvlgari.jpg", alt: "Relógio Bulgari Bulgari Diagono - vista frontal" },
      { src: "/brinco.svg", alt: "Relógio Bulgari Bulgari Diagono - uso no pulso" },
      { src: "/relogio-louis.jpg", alt: "Relógio Bulgari Bulgari Diagono - vista lateral" },
      { src: "/relogio.svg", alt: "Relógio - vista laterals" },
      { src: "/diamond.svg", alt: "Relógio - vista laterals" },
      { src: "/sale.svg", alt: "Relógio - vista laterals" },
      { src: "/vintage.svg", alt: "Relógio - vista laterals" },
      { src: "/pulseira.svg", alt: "Relógio - vista laterals" },
      { src: "/ecommerce.mp4", alt: "Relógio - vista laterals" },
    ],
    accordionItems: [
      {
        title: "Informações",
        content: "Peça seminova, revisada e certificada pela equipe Orit.",
      },
      {
        title: "Guia de Medidas",
        content: "Diâmetro da caixa: 38mm. Comprimento da pulseira: 20cm.",
      },
      {
        title: "Troque com Orit 360",
        content: "Troque essa peça em até 360 dias por outra do seu interesse.",
      },
    ],
  };

  return { produto };
}
