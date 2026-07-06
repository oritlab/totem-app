// Tipos de domínio de "Produtos" — compartilhados entre Listagem/ e (futuro)
// Detalhes/. Tipos de props específicos de UI ficam em Listagem/types.ts.

export type Product = {
  sku: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  listPrice?: number;
  categories: string[];
};

export type BannerVariant =
  | "cover" // imagem de fundo cheia + overlay escuro + texto claro (ex: relógios)
  | "split"; // fundo claro + imagem contida de um lado + texto escuro do outro

export type BannerAlign = "left" | "right";

export type CategoryBanner = {
  imageUrl?: string;
  title: string;
  subtitle: string;
  variant: BannerVariant;
  align: BannerAlign;
};

export type Category = {
  slug: string;
  name: string;
  banner: CategoryBanner;
};
