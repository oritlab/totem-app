"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAvailabilityStreamHook from "@/src/global/hooks/useAvailabilityStreamHook";
import { AvailabilityEvent } from "../types";

// Configurável: tempo até o redirecionamento automático, caso o cliente não toque no botão.
const REDIRECT_DELAY_MS = 15000;

export default function useAvailabilityHook(sku: string) {
  const [unavailable, setUnavailable] = useState(false);
  const router = useRouter();

  useAvailabilityStreamHook(
    function (event: AvailabilityEvent) {
      if (event.sku !== sku) return;

      // Stream é a fonte viva enquanto a página está aberta — um evento
      // available:true depois de um available:false cancela o aviso.
      setUnavailable(!event.available);
    }
  );

  useEffect(
    function () {
      if (!unavailable) return;

      const timeoutId = setTimeout(function () {
        router.back();
      }, REDIRECT_DELAY_MS);

      return function () {
        clearTimeout(timeoutId);
      };
    },
    [unavailable, router]
  );

  function handleRedirect() {
    router.back();
  }

  // return: só o que o componente consome, nunca o setter
  return { unavailable, handleRedirect };
}
