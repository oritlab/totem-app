import { AxiosError } from "axios";

import api from "@/src/services/api";
import { ApiConfig } from "@/src/configurations/ApiConfig";

import { BackendProductListItem, mapToProduct } from "../Hooks/functions/mapToProduct";
import { Pagination, Product, ProductSortOption, RequestStatus } from "../types";

type CategoryProductsResponse = {
  items: BackendProductListItem[];
  metadata: { pageNumber: number; pageSize: number; showing: number; total: number };
};

function extractErrorMessage(error: AxiosError<{ message?: string }>): string {
  const status = error.response?.status;
  if (status === 404) return "Categoria não encontrada.";
  if (status === 500) {
    return "Ocorreu um erro interno. Por favor, entre em contato com o suporte.";
  }
  return error.response?.data?.message || "Ocorreu um erro inesperado.";
}

export async function GETCategoryProducts(
  categoryId: number,
  pageNumber: number,
  pageSize: number,
  sort: ProductSortOption,
  filterParams: Record<string, string | string[]>,
  setProducts: (updater: (previous: Product[]) => Product[]) => void,
  setPagination: (pagination: Pagination) => void,
  setRequestStatus: (status: RequestStatus) => void
): Promise<void> {
  setRequestStatus({ loading: true, error: null });

  const params = { pageNumber: String(pageNumber), pageSize: String(pageSize), sort, ...filterParams };

  return api
    .get<CategoryProductsResponse>(ApiConfig.Router.CategoryProducts(categoryId, params))
    .then(function (response) {
      const products = response.data.items.map(mapToProduct);

      setProducts((previous) => (pageNumber === 1 ? products : [...previous, ...products]));
      setPagination({
        pageNumber: response.data.metadata.pageNumber,
        pageSize: response.data.metadata.pageSize,
        total: response.data.metadata.total,
      });
      setRequestStatus({ loading: false, error: null });
    })
    .catch(function (error) {
      setRequestStatus({ loading: false, error: extractErrorMessage(error) });
    });
}
