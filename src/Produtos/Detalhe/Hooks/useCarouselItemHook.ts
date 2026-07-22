"use client";

import { useRef, useState } from "react";

import { isVideoSrc } from "../utils/media";

export default function useCarouselItemHook(src: string) {
  // 1. States
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 2. Funções de API — N/A

  // 3. useEffect — N/A

  const isVideo = isVideoSrc(src);

  // 4. Handlers
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

  function handleImage(action: "load" | "error") {
    if (action === "load") setLoaded(true);
    if (action === "error") setLoaded(true);
  }

  // 5. return — só o que o componente consome, nunca o setter
  return { videoRef, isPlaying, isVideo, loaded, handleToggle, handleEnded, handleImage };
}
