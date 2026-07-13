import { Dispatch, SetStateAction } from "react";

import { ApiConfig } from "@/src/configurations/ApiConfig";
import { RequestStatus } from "@/src/global/types/global";
import api from "@/src/services/api";
import { CategoryResponse } from "../types";

// GET /api/v1/categories é rota pública, sem paginação — resposta é array
// direto, [] quando não há categorias (não é erro). A Home dispara essa
// chamada em background ao carregar; cacheamos a promise pra a tela de
// listagem reaproveitar o resultado em vez de repetir a requisição.
let categoriesRequest: Promise<CategoryResponse[]> | null = null;

function requestCategories(): Promise<CategoryResponse[]> {
  if (!categoriesRequest) {
    categoriesRequest = api
      .get<CategoryResponse[]>(ApiConfig.Router.Categories())
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        categoriesRequest = null;
        throw error;
      });
  }

  return categoriesRequest;
}

export function GETCategories(
  setCategories: Dispatch<SetStateAction<CategoryResponse[]>>,
  setRequestStatus: Dispatch<SetStateAction<RequestStatus>>
) {
  setRequestStatus({ loading: true, error: null });

  requestCategories()
    .then(function (categories) {
      setCategories(categories);
      setRequestStatus({ loading: false, error: null });
    })
    .catch(function () {
      setCategories([]);
      setRequestStatus({ loading: false, error: "Ocorreu um erro inesperado." });
    });
}
