import { useEffect, useState } from "react";

import { RequestStatus } from "@/src/global/types/global";
import { GETProduto } from "../API/ProdutoAPI";
import { ProdutoData } from "../types";

export default function useProdutoHook(sku: string) {
  // 1. States
  const [produto, setProduto] = useState<ProdutoData | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({ loading: true, error: null });

  // 2. Funções de API — GETProduto (ver API/ProdutoAPI.ts)

  // 3. useEffect
  useEffect(function () {
    GETProduto(sku, setProduto, setRequestStatus);
  }, []);

  // 5. return — só o que o componente consome, nunca os setters
  return { produto, requestStatus };
}
