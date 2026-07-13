import { useEffect, useState } from "react";

import { RequestStatus } from "@/src/global/types/global";
import { GETCategories } from "../API/CategoriesAPI";
import { CategoryResponse } from "../types";

export default function useCategoriesHook() {
  // 1. States
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({ loading: true, error: null });

  // 2. Funções de API — GETCategories (ver API/CategoriesAPI.ts)

  // 3. useEffect
  useEffect(function () {
    GETCategories(setCategories, setRequestStatus);
  }, []);

  // 5. return — só o que o componente consome, nunca os setters
  return { categories, requestStatus };
}
