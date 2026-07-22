import Image from "next/image";

import { CarouselItemProps } from "../types";
import useCarouselItemHook from "../Hooks/useCarouselItemHook";

export default function CarouselItem(props: CarouselItemProps) {
  const { media, priority, onClick, onMediaError } = props;
  const { videoRef, isPlaying, isVideo, loaded, handleToggle, handleEnded, handleImage } = useCarouselItemHook(
    media.src
  );

  if (isVideo) {
    return (
      <div className="absolute inset-0" onClick={handleToggle}>
        <video
          ref={videoRef}
          src={media.src}
          playsInline
          onEnded={handleEnded}
          onError={() => onMediaError?.(media.src)}
          aria-label={media.alt}
          className="h-full w-full cursor-pointer object-cover"
        />

        {!isPlaying && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-24 w-24 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                d="M8 5v14l11-7z"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="Ampliar imagem"
      onClick={onClick}
      className="absolute inset-0 cursor-pointer"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-br from-zinc-100 via-zinc-200 to-zinc-100" />
      )}
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="33vw"
        priority={priority}
        draggable={false}
        className={`pointer-events-none object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => handleImage("load")}
        onError={() => {
          handleImage("error");
          onMediaError?.(media.src);
        }}
      />
    </button>
  );
}
