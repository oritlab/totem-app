"use client";

import { useState } from "react";

import useAvailabilityStreamHook from "./useAvailabilityStreamHook";
import { AvailabilityEvent } from "../types";

export default function useAvailabilityHook(sku: string) {
  const [unavailable, setUnavailable] = useState(false);

  useAvailabilityStreamHook(
    function (event: AvailabilityEvent) {
      if (event.sku !== sku) return;

      // Stream é a fonte viva enquanto a página está aberta — um evento
      // available:true depois de um available:false cancela o aviso.
      setUnavailable(!event.available);
    }
  );

  // return: só o que o componente consome, nunca o setter
  return { unavailable };
}
