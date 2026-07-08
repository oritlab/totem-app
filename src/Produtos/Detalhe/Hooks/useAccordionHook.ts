"use client";

import { useState } from "react";

import { AccordionState } from "../types";

export default function useAccordionHook() {
  // 1. States
  const [accordion, setAccordion] = useState<AccordionState>({ openIndex: null });

  // 2. Funções de API — N/A

  // 3. useEffect — N/A

  // 4. Handlers
  function handleToggle(index: number) {
    setAccordion((prev) => ({ openIndex: prev.openIndex === index ? null : index }));
  }

  // 5. return — só o que o componente consome, nunca o setter
  return { openIndex: accordion.openIndex, handleToggle };
}
