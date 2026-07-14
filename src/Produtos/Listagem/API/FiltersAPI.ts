import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

import api from "@/src/services/api";
import { ApiConfig } from "@/src/configurations/ApiConfig";
import { RequestStatus } from "@/src/global/types/global";

import { buildFilterQueryParams } from "../filters";
import { CategoryFiltersResponse, FilterSelections } from "../types";

function extractErrorMessage(error: AxiosError<{ message?: string }>): string {
  const status = error.response?.status;
  if (status === 404) return "Categoria não encontrada.";
  if (status === 500) {
    return "Ocorreu um erro interno. Por favor, entre em contato com o suporte.";
  }
  return error.response?.data?.message || "Ocorreu um erro inesperado.";
}

// Recebe currentFilters (última resposta de facets já carregada) só pra
// resolver nome de marca -> id e label de faixa de preço -> min/max das
// seleções atuais — não é o dado que está sendo atualizado por esta chamada.
export async function GETCategoryFilters(
  categoryId: number,
  selections: FilterSelections,
  currentFilters: CategoryFiltersResponse | null,
  setFilters: Dispatch<SetStateAction<CategoryFiltersResponse | null>>,
  setRequestStatus: Dispatch<SetStateAction<RequestStatus>>
): Promise<void> {
  setRequestStatus({ loading: true, error: null });

  const params = buildFilterQueryParams(selections, currentFilters);

  return api
    .get<CategoryFiltersResponse>(ApiConfig.Router.CategoryFilters(categoryId, params))
    .then(function (response) {
      setFilters(response.data);
      setRequestStatus({ loading: false, error: null });
    })
    .catch(function (error) {
      setRequestStatus({ loading: false, error: extractErrorMessage(error) });
    });
}
