"use client";

import { useState } from "react";

import { filterProductsByCategory } from "../categories";
import { Category, CategoryBanner } from "../types";
import FilterBar from "./Components/FilterBar";
import HeroBanner from "./Components/HeroBanner";
import LoadMore from "./Components/LoadMore";
import ProductGrid from "./Components/ProductGrid";
import { mockProducts } from "./mocks";
import { sortProducts } from "./sort";
import { GridColumns, SortOption } from "./types";

const INITIAL_COUNT = 8;

const DEFAULT_BANNER: CategoryBanner = {
  title: "Catálogo",
  subtitle: "",
  variant: "cover",
  align: "right",
};

type MainProps = {
  category?: Category;
};

// Quem renderiza este componente precisa passar key={category?.slug} —
// é isso que faz o React remontar (e reiniciar paginação/colunas/ordenação)
// ao trocar de categoria, em vez de um useEffect chamando setState.
export default function Main(props: MainProps) {
  const { category } = props;
  const [shown, setShown] = useState(INITIAL_COUNT);
  const [columns, setColumns] = useState<GridColumns>(4);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  const categoryProducts = filterProductsByCategory(mockProducts, category?.slug);
  const visibleProducts = sortProducts(categoryProducts, sortOption).slice(0, shown);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeroBanner {...(category?.banner ?? DEFAULT_BANNER)} />

      <FilterBar
        columns={columns}
        onColumnsChange={setColumns}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <ProductGrid products={visibleProducts} columns={columns} />
      <LoadMore
        shown={visibleProducts.length}
        total={categoryProducts.length}
        onLoadMore={() => setShown(categoryProducts.length)}
      />
    </div>
  );
}
