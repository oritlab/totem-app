"use client";

import { useState } from "react";

import { AccordionState } from "@/src/global/types/produto";

export default function useAccordionHook() {
  const [accordion, setAccordion] = useState<AccordionState>({ openIndex: null });

  function handleToggle(index: number) {
    setAccordion((prev) => ({ openIndex: prev.openIndex === index ? null : index }));
  }

  return { openIndex: accordion.openIndex, handleToggle };
}
