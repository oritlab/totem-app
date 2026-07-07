import { useState } from "react";

import { filterProductsByCategory } from "../categories";
import { mockProducts } from "../mocks";
import { sortProducts } from "../sort";
import { Category, GridColumns, SortOption } from "../types";

const INITIAL_COUNT = 8;

export default function useProductsListHook(category?: Category) {
  // 1. States
  const [displayState, setDisplayState] = useState({
    shown: INITIAL_COUNT,
    columns: 4 as GridColumns,
    sortOption: null as SortOption | null,
  });

  // 2. Funções de API — N/A, dados ainda são mock (ver Context/Integracao-Backend.md)

  // 3. useEffect — N/A, mock já carregado, sem GET inicial

  const categoryProducts = filterProductsByCategory(mockProducts, category?.slug);
  const visibleProducts = sortProducts(categoryProducts, displayState.sortOption).slice(
    0,
    displayState.shown
  );

  // 4. Handlers
  function handleColumnsChange(columns: GridColumns) {
    setDisplayState({ ...displayState, columns });
  }

  function handleSortChange(sortOption: SortOption) {
    setDisplayState({ ...displayState, sortOption });
  }

  function handleLoadMore() {
    setDisplayState({ ...displayState, shown: categoryProducts.length });
  }

  // 5. return — só o que o componente consome, nunca os setters
  return {
    visibleProducts,
    totalCount: categoryProducts.length,
    columns: displayState.columns,
    sortOption: displayState.sortOption,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
  };
}
