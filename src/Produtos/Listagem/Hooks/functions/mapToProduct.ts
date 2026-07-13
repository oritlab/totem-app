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

// Traduz a forma de resposta do backend (title/image/onSale) pra forma que
// o resto da página já consome (name/imageUrl/listPrice opcional). `categories`
// fica sempre vazio — a listagem já vem escopada por categoria pelo próprio
// backend, então esse campo do mock não tem mais função aqui.
export function mapToProduct(item: BackendProductListItem): Product {
  return {
    sku: item.sku,
    name: item.title,
    brand: item.brand ?? "",
    imageUrl: item.image ?? "",
    price: item.price,
    listPrice: item.onSale ? item.listPrice : undefined,
    categories: [],
  };
}
