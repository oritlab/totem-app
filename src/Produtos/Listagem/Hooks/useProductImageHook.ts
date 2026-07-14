import { useState } from "react";

const FALLBACK_IMAGE = "/indisponivel.svg";

export default function useProductImageHook(imageUrl: string) {
  const [imgSrc, setImgSrc] = useState(imageUrl || FALLBACK_IMAGE);
  const [loaded, setLoaded] = useState(false);

  function handleImage(action: "load" | "error") {
    if (action === "load") setLoaded(true);
    if (action === "error") {
      setImgSrc(FALLBACK_IMAGE);
      setLoaded(true);
    }
  }

  return { imgSrc, loaded, handleImage };
}
