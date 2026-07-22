import Image from "next/image";

import { ImageLightboxProps } from "../types";
import { isVideoSrc } from "../utils/media";

export default function ImageLightbox(props: ImageLightboxProps) {
  const { images, activeIndex, onClose, onNext, onPrev, onSelect, onMediaError } = props;
  const media = images[activeIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white" onClick={onClose}>
      <div className="flex items-center justify-end bg-black/70 px-4 py-3" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium tracking-wide text-white"
        >
          FECHAR <span className="text-lg leading-none">&times;</span>
        </button>
      </div>

      <div className="relative flex-1 bg-black">
        {isVideoSrc(media.src) ? (
          <video
            key={media.src}
            src={media.src}
            playsInline
            controls
            onClick={(event) => event.stopPropagation()}
            onError={() => onMediaError?.(media.src)}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            key={media.src}
            src={media.src}
            alt={media.alt}
            fill
            sizes="100vw"
            onClick={(event) => event.stopPropagation()}
            onError={() => onMediaError?.(media.src)}
            className="object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={(event) => {
                event.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-xl text-white shadow-md"
            >
              &#10094;
            </button>
            <button
              type="button"
              aria-label="Próxima imagem"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-xl text-white shadow-md"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex items-center justify-center bg-black gap-2 py-3"
          onClick={(event) => event.stopPropagation()}
        >
          {images.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              aria-label={`Ver imagem ${index + 1}`}
              onClick={() => onSelect(index)}
              className={`h-2 w-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-gray-500" : "bg-zinc-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
