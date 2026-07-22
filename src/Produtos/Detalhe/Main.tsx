"use client";

import useProdutoHook from "./Hooks/useProdutoHook";
import useAccordionHook from "./Hooks/useAccordionHook";
import useAvailabilityHook from "./Hooks/useAvailabilityHook";
import useImageLightboxHook from "./Hooks/useImageLightboxHook";
import useMediaAvailabilityHook from "./Hooks/useMediaAvailabilityHook";
import TopBar from "./Components/TopBar";
import ImageCarousel from "./Components/ImageCarousel";
import ProductInfo from "./Components/ProductInfo";
import AccordionSection from "./Components/AccordionSection";
import AvailabilityModal from "./Components/AvailabilityModal";
import ImageLightbox from "./Components/ImageLightbox";
import { MainProps } from "./types";

export default function Main(props: MainProps) {
  const { sku } = props;
  const { produto, requestStatus } = useProdutoHook(sku);
  const { openIndex, handleToggle } = useAccordionHook();
  const { unavailable, handleRedirect } = useAvailabilityHook(sku);
  const { availableImages, markFailed } = useMediaAvailabilityHook(produto?.images ?? []);
  const lightbox = useImageLightboxHook(availableImages.length);
  const isLightboxOpen = lightbox.activeIndex !== null && lightbox.activeIndex < availableImages.length;

  if (requestStatus.loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <span className="text-sm text-[#626262]">Carregando produto...</span>
      </div>
    );
  }

  if (requestStatus.error || !produto) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white p-4">
        <span className="text-sm text-[#626262]">{requestStatus.error ?? "Não encontramos esse produto."}</span>
        <button type="button" onClick={handleRedirect} className="text-sm font-medium text-black underline">
          Voltar para produtos
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-4">
      <TopBar category={produto.category} handleRedirect={handleRedirect} />

      <ImageCarousel images={availableImages} onImageClick={lightbox.open} onMediaError={markFailed} />

      <ProductInfo produto={produto} />

      <AccordionSection accordionItems={produto.accordionItems} openIndex={openIndex} handleToggle={handleToggle} />

      <AvailabilityModal open={unavailable} handleRedirect={handleRedirect} />

      {isLightboxOpen && (
        <ImageLightbox
          images={availableImages}
          activeIndex={lightbox.activeIndex as number}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
          onSelect={lightbox.goTo}
          onMediaError={markFailed}
        />
      )}
    </div>
  );
}
