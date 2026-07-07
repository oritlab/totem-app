"use client";

import { useRef, useState } from "react";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

export default function useCarouselItemHook(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isVideo = VIDEO_EXTENSIONS.some((extension) => src.toLowerCase().endsWith(extension));

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

  function handleEnded() {
    setIsPlaying(false);
  }

  return { videoRef, isPlaying, isVideo, handleToggle, handleEnded };
}
