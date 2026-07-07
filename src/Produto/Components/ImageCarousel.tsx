"use client";

import { useRef, useState } from "react";

import useCarouselHook from "../Hooks/useCarouselHook";
import { DragState, ImageCarouselProps } from "../types";
import CarouselItem from "./CarouselItem";

const VISIBLE_COUNT = 3;
const GAP_PX = 8;

export default function ImageCarousel(props: ImageCarouselProps) {
  const { images } = props;
  const { index, maxIndex, handleNext, handlePrev, handleDragEnd } = useCarouselHook(
    images.length,
    VISIBLE_COUNT,
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({ dragging: false, startX: 0, offset: 0 });

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

    const itemWidth = (trackRef.current?.offsetWidth ?? 0) / VISIBLE_COUNT;
    handleDragEnd(dragState.offset, itemWidth + GAP_PX);
    setDragState({ dragging: false, startX: 0, offset: 0 });
  }

  const itemWidth = (trackRef.current?.offsetWidth ?? 0) / VISIBLE_COUNT;
  const stepPx = itemWidth + GAP_PX;
  const dragOffsetPx = dragState.dragging ? dragState.offset : 0;

  return (
    <div className="flex w-full items-center">
      {maxIndex > 0 && (
        <button
          aria-label="Imagem anterior"
          onClick={handlePrev}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-black"
        >
          &#10094;
        </button>
      )}

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="flex touch-pan-y select-none gap-2"
          style={{
            transform: `translateX(${dragOffsetPx - index * stepPx}px)`,
            transition: dragState.dragging ? "none" : "transform 300ms ease-out",
            cursor: maxIndex > 0 ? (dragState.dragging ? "grabbing" : "grab") : "default",
          }}
        >
          {images.map((image, i) => (
            <div key={image.src} className="relative aspect-square w-1/3 shrink-0">
              <CarouselItem media={image} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <button
          aria-label="Próxima imagem"
          onClick={handleNext}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-black"
        >
          &#10095;
        </button>
      )}
    </div>
  );
}
