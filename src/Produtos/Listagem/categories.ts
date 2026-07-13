import { Category, CategoryBanner, CategoryResponse, Product } from "./types";

// Config central de categorias — nome, slug (usado na URL /produtos/[slug])
// e banner. Único lugar a editar quando a arte/texto definitivo de cada
// categoria chegar do design. "Relógios" é a única com conteúdo real hoje;
// as demais usam o mesmo tratamento visual (cover, escuro, alinhado à
// direita) como placeholder até termos a arte de cada uma.
export const CATEGORIES: Category[] = [
  {
    slug: "relogios",
    name: "Relógios",
    banner: {
      imageUrl: "https://vender.orit.com.br/totem-images/orit-relogios.jpg",
      title: "Porta-joias\ninfinito",
      subtitle: "Use o quanto quiser, e troque em até 360 dias",
      variant: "cover",
      align: "right",
    },
  },
  { slug: "novidades", name: "Novidades", banner: placeholderBanner("Novidades") },
  { slug: "vintage", name: "Vintage", banner: placeholderBanner("Vintage") },
  { slug: "diamantes", name: "Diamantes", banner: placeholderBanner("Diamantes") },
  { slug: "marcas-iconicas", name: "Marcas Icônicas", banner: placeholderBanner("Marcas Icônicas") },
  { slug: "joias", name: "Joias", banner: placeholderBanner("Joias") },
  { slug: "aneis", name: "Anéis e Alianças", banner: placeholderBanner("Anéis") },
  { slug: "brincos", name: "Brincos", banner: placeholderBanner("Brincos") },
  { slug: "colares", name: "Colares", banner: placeholderBanner("Colares") },
  { slug: "pingentes", name: "Pingentes", banner: placeholderBanner("Pingentes") },
  { slug: "pulseiras", name: "Pulseiras", banner: placeholderBanner("Pulseiras") },
];

// Sub-categorias que compõem a vitrine agregada de "joias" (ver
// filterProductsByCategory) — mesmos slugs usados no menu (Header.tsx, que
// mantém sua própria lista local, sem depender deste arquivo).
const JOIAS_SLUGS = ["aneis", "brincos", "colares", "pingentes", "pulseiras"];

// Banner provisório pra categoria sem arte/texto definitivo ainda — sem
// imageUrl, o HeroBanner cai num fundo escuro liso (ver Components/HeroBanner.tsx).
function placeholderBanner(name: string): Category["banner"] {
  return {
    title: name,
    subtitle: "",
    variant: "cover",
    align: "right",
  };
}

// Banner padrão da vitrine quando a categoria não define o próprio (ex:
// "novidades", que agrega tudo em vez de ser uma categoria de verdade).
export const DEFAULT_BANNER: CategoryBanner = {
  title: "Catálogo",
  subtitle: "",
  variant: "cover",
  align: "right",
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

const COMBINING_DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

function normalizeCategoryName(name: string): string {
  return name.normalize("NFD").replace(COMBINING_DIACRITICS, "").toLowerCase().trim();
}

// A API de detalhe do produto só devolve o nome da categoria (não o slug),
// então casamos por nome normalizado (sem acento/caixa) contra CATEGORIES.
export function getCategoryByName(name: string): Category | undefined {
  const normalized = normalizeCategoryName(name);
  return CATEGORIES.find((category) => normalizeCategoryName(category.name) === normalized);
}

// GET /api/v1/categories devolve { id, name } — sem slug. Pra manter a URL
// amigável (/produtos/relogios), casamos o nome remoto contra CATEGORIES
// (mesma normalização de getCategoryByName) e usamos o id só internamente,
// pra chamar GET /api/v1/categories/{id}/products.
export function getCategoryIdBySlug(
  categorySlug: string,
  remoteCategories: CategoryResponse[]
): number | undefined {
  return remoteCategories.find((remoteCategory) => getCategoryByName(remoteCategory.name)?.slug === categorySlug)
    ?.id;
}

// "novidades" não é uma categoria de produto de fato — é uma vitrine com
// tudo, então não filtra por slug. "joias" agrega as 5 sub-categorias de
// JOIAS_SLUGS, em vez de filtrar por um slug "joias" que nenhum produto tem.
export function filterProductsByCategory(products: Product[], categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === "novidades") return products;
  if (categorySlug === "joias") {
    return products.filter((product) =>
      product.categories.some((slug) => JOIAS_SLUGS.includes(slug))
    );
  }
  return products.filter((product) => product.categories.includes(categorySlug));
}
