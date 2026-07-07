import { useState } from "react";

import { filterProductsByCategory } from "../categories";
import { FilterSelections, filterProductsBySelections } from "../filters";
import { mockProducts } from "../mocks";
import { sortProducts } from "../sort";
import { Category, GridColumns, SortOption } from "../types";

const INITIAL_COUNT = 8;

export default function useProductsListHook(category?: Category, selections?: FilterSelections) {
  // 1. States
  const [displayState, setDisplayState] = useState({
    shown: INITIAL_COUNT,
    columns: 4 as GridColumns,
    sortOption: null as SortOption | null,
  });

  // 2. Funções de API — N/A, dados ainda são mock (ver Context/Integracao-Backend.md)

  // 3. useEffect — N/A, mock já carregado, sem GET inicial

  const categoryProducts = filterProductsByCategory(mockProducts, category?.slug);
  const filteredProducts = filterProductsBySelections(categoryProducts, selections ?? {});
  const visibleProducts = sortProducts(filteredProducts, displayState.sortOption).slice(
    0,
    displayState.shown
  );

  // 4. Handlers
  function handleColumnsChange(columns: GridColumns) {
    setDisplayState({ ...displayState, columns });
  }

  function handleSortChange(sortOption: SortOption | null) {
    setDisplayState({ ...displayState, sortOption });
  }

  function handleLoadMore() {
    setDisplayState({ ...displayState, shown: filteredProducts.length });
  }

  // 5. return — só o que o componente consome, nunca os setters
  return {
    categoryProducts,
    visibleProducts,
    totalCount: filteredProducts.length,
    columns: displayState.columns,
    sortOption: displayState.sortOption,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
  };
}
