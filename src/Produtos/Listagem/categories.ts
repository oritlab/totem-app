import { ApiConfig } from "../../configurations/ApiConfig";
import { Category, CategoryBanner, CategoryResponse } from "./types";

export const CATEGORIES: Category[] = [
  { slug: "relogios", name: "Relógios", banner: imageBanner("Relógios", "relogios-categoria") },
  { slug: "sale", name: "Sale", banner: imageBanner("Sale", "campanha-categoria") },
  { slug: "novidades", name: "Novidades", banner: imageBanner("Novidades", "novidades-categoria") },
  { slug: "vintage", name: "Vintage", banner: imageBanner("Vintage", "vintage-categoria") },
  { slug: "diamantes", name: "Diamantes", banner: imageBanner("Diamantes", "diamantes-categoria") },
  {
    slug: "marcas-iconicas",
    name: "Marcas Icônicas",
    banner: imageBanner("Marcas Icônicas", "marcas-iconicas-categoria"),
  },
  { slug: "joias", name: "Joias", banner: placeholderBanner("Joias") },
  { slug: "aneis", name: "Anéis", banner: imageBanner("Anéis", "aneis-categoria") },
  { slug: "brincos", name: "Brincos", banner: imageBanner("Brincos", "brincos-categoria") },
  { slug: "colares", name: "Colares", banner: imageBanner("Colares", "colares-categoria") },
  {
    slug: "pingentes",
    name: "Pingentes",
    banner: {
      ...imageBanner("Pingentes", "pingentes-categoria"),
      imageClassName: "ml-[-1]",
    },
  },
  { slug: "pulseiras", name: "Pulseiras", banner: imageBanner("Pulseiras", "pulseiras-categoria") },
];

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

// achar o id real a partir do slug da URL.
export function getCategoryIdBySlug(
  categorySlug: string,
  remoteCategories: CategoryResponse[]
): number | undefined {
  return remoteCategories.find((remoteCategory) => getCategoryByName(remoteCategory.name)?.slug === categorySlug)
    ?.id;
}
