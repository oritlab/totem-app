import { calculateDiscountPercent, formatBRL } from "@/src/global/utils/formatPrice";
import { getCategoryByName } from "@/src/Produtos/Listagem/categories";
import { AccordionItemData, ProdutoData, ProductDetailResponse } from "../../types";

const MEASURES_IMAGES_BY_CATEGORY_SLUG: Record<string, string[]> = {
  relogios: [
    "https://orit.fbitsstatic.net/media/content_1_wristwatch_measures.png?v=202409241025",
    "https://orit.fbitsstatic.net/media/content_2_wristwatch_measures.png?v=202409241025",
  ],
  aneis: [
    "https://orit.fbitsstatic.net/media/content_1_ring_measures.png?v=202409241024",
    "https://orit.fbitsstatic.net/media/content_2_ring_measures.png?v=202409241024",
  ],
  pulseiras: ["https://orit.fbitsstatic.net/media/content_1_bracelet_measures.png?v=202409241026"],
  colares: [
    "https://orit.fbitsstatic.net/media/content_1_necklace_measures.png?v=202409241026",
    "https://orit.fbitsstatic.net/media/content_2_necklace_measures.png?v=202409241026",
  ],
};

function buildAccordionItems(
  description: string,
  categorySlug: string | undefined,
  eligible360: boolean
): AccordionItemData[] {
  const items: AccordionItemData[] = [];

  if (description) {
    items.push({ title: "Informações", content: description });
  }

  const measuresImages = categorySlug ? MEASURES_IMAGES_BY_CATEGORY_SLUG[categorySlug] : undefined;
  if (measuresImages) {
    items.push({ title: "Guia de Medidas", content: "", images: measuresImages });
  }

  if (eligible360) {
    items.push({
      title: "Troque com Orit 360",
      content: "Troque essa peça em até 360 dias por outra do seu interesse.",
    });
  }

  return items;
}

export function mapResponseToProduto(response: ProductDetailResponse): ProdutoData {
  // A API retorna várias categorias (ex: "SALE", "RELÓGIOS") sem indicar
  // qual é a categoria de produto de fato — casamos contra CATEGORIES para
  // achar a primeira que corresponde, em vez de assumir a de índice 0.
  const category = response.categories.find((category) => getCategoryByName(category.name));
  const categorySlug = category ? getCategoryByName(category.name)?.slug : undefined;
  const discountPercent = calculateDiscountPercent(response.price, response.listPrice);

  const images = [...response.images]
    .sort((imageA, imageB) => (imageA.order ?? Infinity) - (imageB.order ?? Infinity))
    .map((image) => ({ src: image.url, alt: response.title }));

  return {
    reference: response.sku,
    badge: "ÚNICA PEÇA",
    promotionBadge: response.onSale ? `${discountPercent}% OFF` : undefined,
    brand: response.brand ?? "Sem Marca",
    title: response.title,
    category: category?.name ?? "Produtos",
    originalPrice: response.onSale ? formatBRL(response.listPrice) : undefined,
    price: formatBRL(response.price),
    installment: `ou em até ${response.installments.count}x de ${formatBRL(response.installments.amount)}`,
    pixPrice: formatBRL(response.pix.price),
    pixPercent: response.pix.percent,
    images,
    accordionItems: buildAccordionItems(response.description, categorySlug, response.eligible360),
  };
}
