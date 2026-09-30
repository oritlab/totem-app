import { Dispatch, SetStateAction } from "react";

import { ApiConfig } from "@/src/configurations/ApiConfig";
import api from "@/src/services/api";
import { LeadPayload, RequestStatus } from "../types";

export function POSTLeadSubscribe(
  payload: LeadPayload,
  setRequestStatus: Dispatch<SetStateAction<RequestStatus>>,
  handleRedirect: () => void
) {
  setRequestStatus({ loading: true, error: null });

  api
    .post(ApiConfig.Router.LeadSubscribe(), payload)
    .then(function () {
      setRequestStatus({ loading: false, error: null });
      handleRedirect();
    })
    .catch(function (error) {
      const status = error.response?.status;
      const message =
        status === 500
          ? "Ocorreu um erro interno. Por favor, entre em contato com o suporte."
          : error.response?.data?.message || "Ocorreu um erro inesperado.";

      setRequestStatus({ loading: false, error: message });
    });
}
