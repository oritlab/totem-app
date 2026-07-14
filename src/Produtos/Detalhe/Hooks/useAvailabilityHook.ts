"use client";

import { useEffect, useState } from "react";

import { ApiConfig } from "@/src/configurations/ApiConfig";
import { AvailabilityEvent } from "../types";

export default function useAvailabilityHook(sku: string) {
  const [unavailable, setUnavailable] = useState(false);

  // Funções de API: N/A (assina o stream SSE via EventSource nativo, ver useEffect)

  useEffect(
    function () {
      // EventSource exige uma URL absoluta (não passa pelo cliente axios de
      // src/services/api.js, que só resolve paths relativos via baseURL).
      const eventSource = new EventSource(ApiConfig.Host.production + ApiConfig.Router.AvailabilityStream());

      function handleAvailability(event: MessageEvent) {
        const data: AvailabilityEvent = JSON.parse(event.data);
        if (data.sku !== sku) return;

        // Stream é a fonte viva enquanto a página está aberta — um evento
        // available:true depois de um available:false cancela o aviso.
        setUnavailable(!data.available);
      }

      eventSource.addEventListener("availability", handleAvailability);

      return function () {
        eventSource.removeEventListener("availability", handleAvailability);
        eventSource.close();
      };
    },
    [sku]
  );

  // return: só o que o componente consome, nunca o setter
  return { unavailable };
}
