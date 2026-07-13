import { useEffect, useState } from "react";

import { GETCategoryId, GETCategoryProducts } from "../API/ProductsAPI";
import { DEFAULT_BANNER } from "../categories";
import {
  Category,
  GridColumns,
  Pagination,
  Product,
  ProductSortOption,
  RequestStatus,
  SortOption,
} from "../types";

const PAGE_SIZE = 9;

const SORT_MAP: Record<Exclude<SortOption, null>, ProductSortOption> = {
  "novidades": "recentes",
  "nome": "a_a_z",
  "menor-preco": "menor_preco",
  "maior-preco": "maior_preco",
};

export default function useProductsListHook(category?: Category) {
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
  const [displayState, setDisplayState] = useState({
    columns: 4 as GridColumns,
    sortOption: null as SortOption | null,
  });

  // 2. Funções de API — ver API/ProductsAPI.ts
  async function fetchPage(pageNumber: number, sortOption: SortOption | null) {
    const categoryId = await GETCategoryId(category?.name ?? "", setRequestStatus);
    if (categoryId === null) return;

    const backendSort = sortOption ? SORT_MAP[sortOption] : "recentes";
    await GETCategoryProducts(
      categoryId,
      pageNumber,
      backendSort,
      setProducts,
      setPagination,
      setRequestStatus
    );
  }

  // 3. useEffect — só a busca inicial (página 1); troca de categoria remonta
  // o hook via key={category?.slug} em Main.tsx, então não precisa de
  // category/sortOption/fetchPage nas deps aqui (ver Context/Arquitetura-
  // React-Next.md, "useEffect é só pro GET inicial").
  useEffect(() => {
    fetchPage(1, displayState.sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4. Handlers
  function handleColumnsChange(columns: GridColumns) {
    setDisplayState({ ...displayState, columns });
  }

  function handleSortChange(sortOption: SortOption | null) {
    setDisplayState({ ...displayState, sortOption });
    fetchPage(1, sortOption);
  }

  function handleLoadMore() {
    fetchPage(pagination.pageNumber + 1, displayState.sortOption);
  }

  // 5. return — só o que o componente consome, nunca os setters
  return {
    banner: category?.banner ?? DEFAULT_BANNER,
    visibleProducts: products,
    totalCount: pagination.total,
    columns: displayState.columns,
    sortOption: displayState.sortOption,
    filterGroups: [],
    activeGroup: null,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
    requestStatus,
  };
}
