"use client";

import { useState } from "react";

import { AccordionState } from "../types";

export default function useAccordionHook() {
  const [accordion, setAccordion] = useState<AccordionState>({ openIndex: null });

  function handleToggle(index: number) {
    setAccordion((prev) => ({ openIndex: prev.openIndex === index ? null : index }));
  }

  return { openIndex: accordion.openIndex, handleToggle };
}
