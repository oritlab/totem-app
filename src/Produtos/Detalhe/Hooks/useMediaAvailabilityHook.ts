"use client";

import { useMemo, useState } from "react";

import { ProdutoImage } from "../types";

export default function useMediaAvailabilityHook(images: ProdutoImage[]) {
  // 1. States
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  // 2. Funções de API — N/A

  // 3. useEffect — N/A

  // 4. Handlers
  function markFailed(src: string) {
    setFailedSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  }

  const availableImages = useMemo(
    () => images.filter((image) => !failedSrcs.has(image.src)),
    [images, failedSrcs]
  );

  // 5. return — só o que o componente consome, nunca o setter
  return { availableImages, markFailed };
}
