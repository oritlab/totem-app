import { Product } from "../types";
import { SortOption } from "./types";

// "novidades" = ordem original do array (não temos data de cadastro no mock,
// então tratamos a ordem em que a Wake devolveu como "mais recente").
export function sortProducts(products: Product[], sortOption: SortOption | null): Product[] {
  if (!sortOption || sortOption === "novidades") return products;

  const sorted = [...products];

  if (sortOption === "nome") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  } else if (sortOption === "menor-preco") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOption === "maior-preco") {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}
