"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { ProdutoImage } from "../types";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((extension) => src.toLowerCase().endsWith(extension));
}

type CarouselItemProps = {
  media: ProdutoImage;
  priority: boolean;
};

export default function CarouselItem(props: CarouselItemProps) {
  const { media, priority } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleToggle() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  if (isVideo(media.src)) {
    return (
      <div className="absolute inset-0" onClick={handleToggle}>
        <video
          ref={videoRef}
          src={media.src}
          playsInline
          onEnded={() => setIsPlaying(false)}
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
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes="33vw"
      priority={priority}
      draggable={false}
      className="pointer-events-none object-cover"
    />
  );
}
