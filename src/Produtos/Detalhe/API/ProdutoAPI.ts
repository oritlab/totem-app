import { Dispatch, SetStateAction } from "react";

import { ApiConfig } from "@/src/configurations/ApiConfig";
import { RequestStatus } from "@/src/global/types/global";
import api from "@/src/services/api";
import { ProblemDetails, ProdutoData, ProductDetailResponse } from "../types";
import { mapResponseToProduto } from "../Hooks/functions/mapResponseToProduto";

export function GETProduto(
  sku: string,
  setProduto: Dispatch<SetStateAction<ProdutoData | null>>,
  setRequestStatus: Dispatch<SetStateAction<RequestStatus>>
) {
  setRequestStatus({ loading: true, error: null });

  api
    .get<ProductDetailResponse>(ApiConfig.Router.ProductDetails(sku))
    .then(function (response) {
      setProduto(mapResponseToProduto(response.data));
      setRequestStatus({ loading: false, error: null });
    })
    .catch(function (error) {
      const status = error.response?.status;
      const message =
        status === 404
          ? "Não encontramos esse produto."
          : status === 410
            ? "Esse produto não está mais disponível."
            : status === 500
              ? "Ocorreu um erro interno. Por favor, entre em contato com o suporte."
              : (error.response?.data as ProblemDetails | undefined)?.detail || "Ocorreu um erro inesperado.";

      setProduto(null);
      setRequestStatus({ loading: false, error: message });
    });
}
