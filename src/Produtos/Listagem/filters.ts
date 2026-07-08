import { FilterGroup, FilterSelections, Product } from "./types";

// Lógica dos filtros de produto — deriva os grupos de filtro disponíveis
// pra categoria e aplica as seleções sobre a lista de produtos.

const PRICE_RANGES = [
  "Até R$ 1.000",
  "de R$ 1.001 a R$ 3.000",
  "de R$ 3.001 a R$ 5.000",
  "de R$ 5.001 a R$ 10.000",
  "de R$ 10.001 a R$ 30.000",
  "acima de R$ 30.000,00",
];

function getBrandOptions(products: Product[]): string[] {
  const brands = new Set(products.map((product) => product.brand));
  return Array.from(brands).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

// Grupos de filtro por categoria — hoje só "relogios" está definido; as
// demais categorias entram conforme forem priorizadas. "genero",
// "material-caixa", "tamanho-caixa", "material-pulseira" e
// "tamanho-pulseira" não têm nenhum atributo correspondente no Product
// ainda — aparecem na lista (estrutura pronta pro backend), com
// options: [] até esses atributos existirem de verdade.
export function getFilterGroupsForCategory(
  categorySlug: string | undefined,
  categoryProducts: Product[]
): FilterGroup[] {
  if (categorySlug !== "relogios") return [];

  return [
    { key: "marcas", label: "Marcas", options: getBrandOptions(categoryProducts) },
    { key: "genero", label: "Gênero", options: [] },
    { key: "material-caixa", label: "Material da Caixa", options: [] },
    { key: "tamanho-caixa", label: "Tamanho da Caixa", options: [] },
    { key: "material-pulseira", label: "Material da Pulseira", options: [] },
    { key: "tamanho-pulseira", label: "Tamanho da Pulseira", options: [] },
    { key: "faixa-preco", label: "Faixa de Preço", options: PRICE_RANGES },
  ];
}

function isPriceInRange(price: number, range: string): boolean {
  if (range === "Até R$ 1.000") return price <= 1000;
  if (range === "de R$ 1.001 a R$ 3.000") return price >= 1001 && price <= 3000;
  if (range === "de R$ 3.001 a R$ 5.000") return price >= 3001 && price <= 5000;
  if (range === "de R$ 5.001 a R$ 10.000") return price >= 5001 && price <= 10000;
  if (range === "de R$ 10.001 a R$ 30.000") return price >= 10001 && price <= 30000;
  if (range === "acima de R$ 30.000,00") return price > 30000;
  return false;
}

// Só "marcas" e "faixa-preco" filtram de fato hoje — os demais grupos não
// têm dado no Product ainda pra filtrar por (ver getFilterGroupsForCategory).
export function filterProductsBySelections(
  products: Product[],
  selections: FilterSelections
): Product[] {
  let result = products;

  if (selections.marcas?.length) {
    result = result.filter((product) => selections.marcas.includes(product.brand));
  }

  if (selections["faixa-preco"]?.length) {
    result = result.filter((product) =>
      selections["faixa-preco"].some((range) => isPriceInRange(product.price, range))
    );
  }

  return result;
}

export function countTotalSelections(selections: FilterSelections): number {
  return Object.values(selections).reduce((total, options) => total + options.length, 0);
}
