import { Product } from "../types";

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
  onSortChange: (sortOption: SortOption) => void;
};

export type LoadMoreProps = {
  shown: number;
  total: number;
  onLoadMore: () => void;
};
