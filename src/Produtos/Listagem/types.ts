import { RefObject } from "react";

import { HeaderProps, Pagination, ProductSortOption, RequestStatus } from "../../global/types/global";

export type { HeaderProps, Pagination, ProductSortOption, RequestStatus };

export type Product = {
  sku: string;
  name: string;
  brand: string;
  imageUrl: string;
  images?: string[];
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

export type FilterGroupKey =
  | "marcas"
  | "genero"
  | "material-caixa"
  | "tamanho-caixa"
  | "material-pulseira"
  | "tamanho-pulseira"
  | "faixa-preco";

export type FilterGroup = {
  key: FilterGroupKey;
  label: string;
  options: string[];
};

export type FilterSelections = Record<string, string[]>;

export type FilterDrawerProps = {
  isOpen: boolean;
  filterGroups: FilterGroup[];
  selections: FilterSelections;
  activeGroupKey: FilterGroupKey | null;
  totalSelectedCount: number;
  sortOption: SortOption | null;
  onClose: () => void;
  onOpenGroup: (groupKey: FilterGroupKey) => void;
  onSortChange: (sortOption: SortOption) => void;
  onClearFilters: () => void;
};

export type FilterOptionsDrawerProps = {
  group: FilterGroup | null;
  selectedOptions: string[];
  onClose: () => void;
  onToggleOption: (option: string) => void;
};

export type MainProps = {
  category?: Category;
};
