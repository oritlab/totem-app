import { calculateDiscountPercent, calculatePriceWithDiscount } from "@/src/global/utils/formatPrice";
import { Product } from "../../types";

export type BackendProductListItem = {
  sku: string;
  title: string;
  brand: string | null;
  image: string | null;
  listPrice: number;
  price: number;
  onSale: boolean;
};

// Campanha Dia do Cliente (14/09–30/09): 10% off em toda peça, calculado no
// front porque o preço promocional não vem preenchido no backend. Reverter
// pra "price: item.onSale ? item.listPrice : item.price, listPrice: undefined"
// após 30/09.
const CAMPAIGN_DISCOUNT_PERCENT = 10;

// Traduz a forma de resposta do backend (title/image/onSale) pra forma que
// o resto da página já consome (name/imageUrl/listPrice opcional). `categories`
// fica sempre vazio — a listagem já vem escopada por categoria pelo próprio
// backend, então esse campo do mock não tem mais função aqui.
export function mapToProduct(item: BackendProductListItem): Product {
  const price = calculatePriceWithDiscount(item.price, CAMPAIGN_DISCOUNT_PERCENT);

  return {
    sku: item.sku,
    name: item.title,
    brand: item.brand ?? "",
    imageUrl: item.image ?? "",
    price,
    listPrice: item.price,
    discountPercent: calculateDiscountPercent(price, item.price),
    categories: [],
  };
}
