"use client";

import { useEffect, useState } from "react";

export default function useImageLightboxHook(total: number) {
  // 1. States
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 2. Funções de API — N/A

  // 3. useEffect
  // Bloqueia o scroll da página por trás e permite fechar com Esc, como um modal de fato.
  useEffect(
    function () {
      if (activeIndex === null) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") close();
      }
      window.addEventListener("keydown", handleKeyDown);

      return function () {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [activeIndex]
  );

  // 4. Handlers
  function open(index: number) {
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
  }

  function next() {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % total));
  }

  function prev() {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + total) % total));
  }

  // 5. return — só o que o componente consome, nunca o setter
  return { activeIndex, open, close, next, prev, goTo: open };
}
