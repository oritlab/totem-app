import { Category, Product } from "./types";

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
  { slug: "aneis", name: "Anéis", banner: placeholderBanner("Anéis") },
  { slug: "brincos", name: "Brincos", banner: placeholderBanner("Brincos") },
  { slug: "colares", name: "Colares", banner: placeholderBanner("Colares") },
  { slug: "pingentes", name: "Pingentes", banner: placeholderBanner("Pingentes") },
  { slug: "pulseiras", name: "Pulseiras", banner: placeholderBanner("Pulseiras") },
];

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

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

// "novidades" não é uma categoria de produto de fato — é uma vitrine com
// tudo, então não filtra por slug.
export function filterProductsByCategory(products: Product[], categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === "novidades") return products;
  return products.filter((product) => product.categories.includes(categorySlug));
}
