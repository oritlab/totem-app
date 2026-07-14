import { ImageCarouselProps } from "../types";
import useCarouselHook from "../Hooks/useCarouselHook";
import CarouselItem from "./CarouselItem";

const VISIBLE_COUNT = 3;

export default function ImageCarousel(props: ImageCarouselProps) {
  const { images } = props;
  const {
    maxIndex,
    trackRef,
    dragging,
    translatePx,
    handleNavigate,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCarouselHook(images.length, VISIBLE_COUNT);

  return (
    <div className={`flex w-full items-center ${maxIndex === 0 ? "px-4 sm:px-6" : ""}`}>
      {maxIndex > 0 && (
        <button
          aria-label="Imagem anterior"
          onClick={() => handleNavigate("prev")}
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
            transform: `translateX(${translatePx}px)`,
            transition: dragging ? "none" : "transform 300ms ease-out",
            cursor: maxIndex > 0 ? (dragging ? "grabbing" : "grab") : "default",
          }}
        >
          {/* images é uma lista estática por produto (nunca reordena), então
              o índice como key é seguro mesmo com src repetido no mock. */}
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square w-1/3 shrink-0">
              <CarouselItem media={image} priority={index < VISIBLE_COUNT} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <button
          aria-label="Próxima imagem"
          onClick={() => handleNavigate("next")}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-black"
        >
          &#10095;
        </button>
      )}
    </div>
  );
}
