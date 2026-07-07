"use client";

import { useState } from "react";

export default function useCarouselHook(total: number, visibleCount: number) {
  const maxIndex = Math.max(0, total - visibleCount);
  const [index, setIndex] = useState(0);

  function handleNext() {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }

  function handlePrev() {
    setIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleDragEnd(offsetX: number, itemWidth: number) {
    if (!itemWidth) return;

    const steps = Math.round(-offsetX / itemWidth);
    if (!steps) return;

    setIndex((prev) => Math.min(Math.max(prev + steps, 0), maxIndex));
  }

  return { index, maxIndex, handleNext, handlePrev, handleDragEnd };
}
