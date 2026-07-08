"use client";

import useProdutoHook from "./Hooks/useProdutoHook";
import useAccordionHook from "./Hooks/useAccordionHook";
import TopBar from "./Components/TopBar";
import ImageCarousel from "./Components/ImageCarousel";
import ProductInfo from "./Components/ProductInfo";
import AccordionSection from "./Components/AccordionSection";
import { MainProps } from "./types";

export default function Main(props: MainProps) {
  const { sku } = props;
  const { produto } = useProdutoHook(sku);
  const { openIndex, handleToggle } = useAccordionHook();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-4">
      <TopBar category={produto.category} backHref="/produtos" />

      <ImageCarousel images={produto.images} />

      <ProductInfo produto={produto} />

      <AccordionSection accordionItems={produto.accordionItems} openIndex={openIndex} handleToggle={handleToggle} />
    </div>
  );
}
