import { formatBRL } from "@/src/global/utils/formatPrice";
import { getCategoryBySlug } from "@/src/Produtos/Listagem/categories";
import { mockProducts } from "@/src/Produtos/Listagem/mocks";
import { ProdutoData } from "../types";

const FALLBACK_ACCORDION_ITEMS = [
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
];

export default function useProdutoHook(sku: string) {
  // 1. States — N/A, derivado direto do mock

  // 2. Funções de API — N/A, dados ainda são mock (ver Context/Integracao-Backend.md)

  // 3. useEffect — N/A

  const product = mockProducts.find((mockProduct) => mockProduct.sku === sku) ?? mockProducts[0];
  const isPromo = !!product.listPrice && product.listPrice > product.price;
  const category = getCategoryBySlug(product.categories[0]);

  const produto: ProdutoData = {
    reference: product.sku,
    badge: "ÚNICA PEÇA",
    promotionBadge: isPromo ? "PROMOÇÃO" : undefined,
    brand: product.brand,
    title: product.name,
    category: category?.name ?? "Produtos",
    originalPrice: isPromo ? formatBRL(product.listPrice as number) : undefined,
    price: formatBRL(product.price),
    installment: `ou em até 10x de ${formatBRL(product.price / 10)}`,
    pixPrice: formatBRL(product.price * 0.93),
    images: (product.images ?? [product.imageUrl]).map((imageUrl) => ({ src: imageUrl, alt: product.name })),
    accordionItems: FALLBACK_ACCORDION_ITEMS,
  };

  // 5. return
  return { produto };
}
