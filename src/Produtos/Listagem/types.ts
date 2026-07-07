import { RefObject } from "react";

import { HeaderProps } from "../../global/types/global";

export type { HeaderProps };

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

export type ProductCardProps = {
  product: Product;
};

export type GridColumns = 3 | 4;

export type ProductGridProps = {
  products: Product[];
  columns: GridColumns;
};

export type SortOption = "nome" | "menor-preco" | "maior-preco" | "novidades";

export const SORT_OPTION_LABELS: Record<SortOption, string> = {
  "nome": "Nome A-Z",
  "menor-preco": "Menor Preço",
  "maior-preco": "Maior Preço",
  "novidades": "Novidades",
};

export type FilterBarProps = {
  columns: GridColumns;
  onColumnsChange: (columns: GridColumns) => void;
  sortOption: SortOption | null;
  onSortChange: (sortOption: SortOption | null) => void;
  isSortOpen: boolean;
  sortRef: RefObject<HTMLDivElement | null>;
  onToggleSort: () => void;
  onCloseSort: () => void;
  hasActiveFilters: boolean;
  onOpenFilter: () => void;
  onClearFilters: () => void;
};

export type LoadMoreProps = {
  shown: number;
  total: number;
  onLoadMore: () => void;
};
