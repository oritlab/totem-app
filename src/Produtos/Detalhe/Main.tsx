"use client";

import { useRouter } from "next/navigation";

import useProdutoHook from "./Hooks/useProdutoHook";
import useAccordionHook from "./Hooks/useAccordionHook";
import useAvailabilityHook from "./Hooks/useAvailabilityHook";
import TopBar from "./Components/TopBar";
import ImageCarousel from "./Components/ImageCarousel";
import ProductInfo from "./Components/ProductInfo";
import AccordionSection from "./Components/AccordionSection";
import AvailabilityModal from "./Components/AvailabilityModal";
import { MainProps } from "./types";

export default function Main(props: MainProps) {
  const { sku } = props;
  const router = useRouter();
  const { produto, requestStatus } = useProdutoHook(sku);
  const { openIndex, handleToggle } = useAccordionHook();
  const { unavailable } = useAvailabilityHook(sku);

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
        <button type="button" onClick={() => router.back()} className="text-sm font-medium text-black underline">
          Voltar para produtos
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-4">
      <TopBar category={produto.category} />

      <ImageCarousel images={produto.images} />

      <ProductInfo produto={produto} />

      <AccordionSection accordionItems={produto.accordionItems} openIndex={openIndex} handleToggle={handleToggle} />

      <AvailabilityModal open={unavailable} />
    </div>
  );
}
