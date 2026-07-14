import { useEffect, useState } from "react";

import { RequestStatus } from "@/src/global/types/global";

import { GETCategoryFilters } from "../API/FiltersAPI";
import { GETCategoryProducts } from "../API/ProductsAPI";
import { DEFAULT_BANNER, getCategoryIdBySlug } from "../categories";
import { buildFilterGroups, buildFilterQueryParams } from "../filters";
import useCategoriesHook from "./useCategoriesHook";
import {
  Category,
  CategoryFiltersResponse,
  FilterGroupKey,
  FilterSelections,
  GridColumns,
  Pagination,
  Product,
  ProductSortOption,
  SortOption,
} from "../types";

const PAGE_SIZE = 9;

const SORT_MAP: Record<Exclude<SortOption, null>, ProductSortOption> = {
  "novidades": "recentes",
  "nome": "a_a_z",
  "menor-preco": "menor_preco",
  "maior-preco": "maior_preco",
};

export default function useProductsListHook(
  category: Category | undefined,
  selections: FilterSelections,
  activeGroupKey: FilterGroupKey | null
) {
  // 1. States
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    total: 0,
  });
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    loading: false,
    error: null,
  });
  const [filtersData, setFiltersData] = useState<CategoryFiltersResponse | null>(null);
  const [filtersStatus, setFiltersStatus] = useState<RequestStatus>({
    loading: false,
    error: null,
  });
  const [displayState, setDisplayState] = useState({
    columns: 4 as GridColumns,
    sortOption: null as SortOption | null,
  });

  // 2. Funções de API
  const { categories: remoteCategories } = useCategoriesHook();
  const categoryId = category ? getCategoryIdBySlug(category.slug, remoteCategories) : undefined;

  async function fetchPage(pageNumber: number, sortOption: SortOption | null, filterSelections: FilterSelections) {
    if (categoryId === undefined) return;

    const backendSort = sortOption ? SORT_MAP[sortOption] : "recentes";
    const filterParams = buildFilterQueryParams(filterSelections, filtersData);
    await GETCategoryProducts(
      categoryId,
      pageNumber,
      backendSort,
      filterParams,
      setProducts,
      setPagination,
      setRequestStatus
    );
  }

  async function fetchFilters(filterSelections: FilterSelections) {
    if (categoryId === undefined) return;
    await GETCategoryFilters(categoryId, filterSelections, filtersData, setFiltersData, setFiltersStatus);
  }

  useEffect(
    function () {
      fetchPage(1, displayState.sortOption, selections);
      fetchFilters(selections);
    },
    [categoryId, selections]
  );

  function handleColumnsChange(columns: GridColumns) {
    setDisplayState({ ...displayState, columns });
  }

  function handleSortChange(sortOption: SortOption | null) {
    setDisplayState({ ...displayState, sortOption });
    fetchPage(1, sortOption, selections);
  }

  function handleLoadMore() {
    fetchPage(pagination.pageNumber + 1, displayState.sortOption, selections);
  }

  // 5. return
  const filterGroups = buildFilterGroups(filtersData);
  const activeGroup = filterGroups.find((group) => group.key === activeGroupKey) ?? null;

  return {
    banner: category?.banner ?? DEFAULT_BANNER,
    visibleProducts: products,
    totalCount: pagination.total,
    columns: displayState.columns,
    sortOption: displayState.sortOption,
    filterGroups,
    activeGroup,
    filtersStatus,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
    requestStatus,
  };
}
