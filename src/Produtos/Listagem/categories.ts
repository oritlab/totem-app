import { ApiConfig } from "../../configurations/ApiConfig";
import { Category, CategoryBanner, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "relogios",
    name: "Relógios",
    banner: {
      imageUrl: ApiConfig.Router.TotemImage("RELÓGIOS"),
      title: "Porta-joias\ninfinito",
      subtitle: "Use o quanto quiser, e troque em até 360 dias",
      variant: "cover",
      align: "right",
    },
  },
  { slug: "sale", name: "Sale", banner: placeholderBanner("Sale") },
  { slug: "novidades", name: "Novidades", banner: imageBanner("Novidades", "NOVIDADES") },
  { slug: "vintage", name: "Vintage", banner: imageBanner("Vintage", "VINTAGE") },
  { slug: "diamantes", name: "Diamantes", banner: imageBanner("Diamantes", "DIAMANTES") },
  {
    slug: "marcas-iconicas",
    name: "Marcas Icônicas",
    banner: imageBanner("Marcas Icônicas", "MARCAS ICONICAS"),
  },
  { slug: "joias", name: "Joias", banner: placeholderBanner("Joias") },
  { slug: "aneis", name: "Anéis e Alianças", banner: imageBanner("Anéis", "ANEIS") },
  { slug: "brincos", name: "Brincos", banner: imageBanner("Brincos", "BRINCOS") },
  { slug: "colares", name: "Colares", banner: imageBanner("Colares", "COLARES") },
  { slug: "pingentes", name: "Pingentes", banner: imageBanner("Pingentes", "PINGENTES") },
  { slug: "pulseiras", name: "Pulseiras", banner: imageBanner("Pulseiras", "PULSEIRAS") },
];

const JOIAS_SLUGS = ["aneis", "brincos", "colares", "pingentes", "pulseiras"];

// Sem imageUrl, o HeroBanner cai num fundo escuro liso (ver Components/HeroBanner.tsx).
function placeholderBanner(name: string): Category["banner"] {
  return {
    title: name,
    subtitle: "",
    variant: "cover",
    align: "right",
  };
}

function imageBanner(name: string, imageName: string): Category["banner"] {
  return {
    imageUrl: ApiConfig.Router.TotemImage(imageName),
    title: name,
    subtitle: "",
    variant: "cover",
    align: "right",
  };
}

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

export function normalizeCategoryName(name: string): string {
  return name.normalize("NFD").replace(COMBINING_DIACRITICS, "").toLowerCase().trim();
}

export function getCategoryByName(name: string): Category | undefined {
  const normalized = normalizeCategoryName(name);
  return CATEGORIES.find((category) => normalizeCategoryName(category.name) === normalized);
}

export function filterProductsByCategory(products: Product[], categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === "novidades") return products;
  if (categorySlug === "joias") {
    return products.filter((product) =>
      product.categories.some((slug) => JOIAS_SLUGS.includes(slug))
    );
  }
  return products.filter((product) => product.categories.includes(categorySlug));
}
