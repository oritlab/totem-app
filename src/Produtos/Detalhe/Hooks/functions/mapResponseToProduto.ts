import { calculatePriceWithDiscount, formatBRL } from "@/src/global/utils/formatPrice";
import { getCategoryByName } from "@/src/Produtos/Listagem/categories";
import { AccordionItemData, ProdutoData, ProductDetailResponse } from "../../types";

// Campanha Dia do Cliente (14/09–30/09): 10% off em toda peça, calculado no
// front porque o preço promocional não vem preenchido no backend. Reverter
// para "undefined"/preço sem desconto após 30/09.
const CAMPAIGN_DISCOUNT_PERCENT = 10;

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

function isValidImageUrl(url: string): boolean {
  return url.startsWith("/") || /^https?:\/\//.test(url);
}

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
      content:
        "Até 360 dias para trocar sua joia ou relógio de luxo sem desvalorizar o preço? Agora é possível! Isso é <strong>Orit 360</strong>!" +
        "<br /><br />" +
        "Ao comprar uma peça na Orit, se elegivel, você já estará participando do Orit 360. O que isso significa?" +
        "<br />" +
        "Em até 360 dias você poderá trocar sua peça por uma nova. Isso mesmo! Você usa muito sua peça e, depois, é só trocar. A Orit receberá sua peça pelo mesmo valor da compra, e sua nova compra só deverá ter um valor 10% superior à peça que está sendo trocada.",
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

  const images = [...response.images]
    .sort((imageA, imageB) => (imageA.order ?? Infinity) - (imageB.order ?? Infinity))
    .filter((image) => isValidImageUrl(image.url))
    .map((image) => ({ src: image.url, alt: response.title }));

  const basePrice = response.onSale ? response.listPrice : response.price;
  const discountedPrice = calculatePriceWithDiscount(basePrice, CAMPAIGN_DISCOUNT_PERCENT);
  // Pix e parcelamento recalculados em cima do preço já com os 10% off —
  // senão o Pix fica mostrando um valor maior que o preço à vista.
  const discountedPixPrice = calculatePriceWithDiscount(discountedPrice, response.pix.percent);
  const discountedInstallmentAmount = discountedPrice / response.installments.count;

  return {
    reference: response.sku,
    badge: "ÚNICA PEÇA",
    promotionBadge: `${CAMPAIGN_DISCOUNT_PERCENT}% OFF`,
    brand: response.brand ?? "Sem Marca",
    title: response.title,
    category: category?.name ?? "Produtos",
    originalPrice: formatBRL(basePrice),
    price: formatBRL(discountedPrice),
    // Reverter installment/pixPrice para response.installments.amount /
    // response.pix.price após 30/09
    installment: `ou em até ${response.installments.count}x de ${formatBRL(discountedInstallmentAmount)}`,
    pixPrice: formatBRL(discountedPixPrice),
    pixPercent: response.pix.percent,
    images,
    accordionItems: buildAccordionItems(response.description, categorySlug, response.eligible360),
  };
}
