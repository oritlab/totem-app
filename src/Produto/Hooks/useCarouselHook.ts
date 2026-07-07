"use client";

import { useRef, useState } from "react";

import { DragState } from "@/src/global/types/produto";

const GAP_PX = 8;

export default function useCarouselHook(total: number, visibleCount: number) {
  const maxIndex = Math.max(0, total - visibleCount);
  const [index, setIndex] = useState(0);
  const [dragState, setDragState] = useState<DragState>({ dragging: false, startX: 0, offset: 0 });
  const trackRef = useRef<HTMLDivElement>(null);

  function handleNavigate(action: string) {
    if (action === "next") setIndex((prev) => Math.min(prev + 1, maxIndex));
    if (action === "prev") setIndex((prev) => Math.max(prev - 1, 0));
  }

  function handlePointerDown(event: React.PointerEvent) {
    if (maxIndex === 0) return;
    setDragState({ dragging: true, startX: event.clientX, offset: 0 });
  }

  function handlePointerMove(event: React.PointerEvent) {
    if (!dragState.dragging) return;
    setDragState((prev) => ({ ...prev, offset: event.clientX - prev.startX }));
  }

  function handlePointerUp() {
    if (!dragState.dragging) return;

    const itemWidth = (trackRef.current?.offsetWidth ?? 0) / visibleCount;
    const stepPx = itemWidth + GAP_PX;
    const steps = Math.round(-dragState.offset / stepPx);
    if (steps) setIndex((prev) => Math.min(Math.max(prev + steps, 0), maxIndex));

    setDragState({ dragging: false, startX: 0, offset: 0 });
  }

  const itemWidth = (trackRef.current?.offsetWidth ?? 0) / visibleCount;
  const stepPx = itemWidth + GAP_PX;
  const dragOffsetPx = dragState.dragging ? dragState.offset : 0;
  const translatePx = dragOffsetPx - index * stepPx;

  return {
    maxIndex,
    trackRef,
    dragging: dragState.dragging,
    translatePx,
    handleNavigate,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
