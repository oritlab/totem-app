"use client";

import useProdutoHook from "./Hooks/useProdutoHook";
import useAccordionHook from "./Hooks/useAccordionHook";
import TopBar from "./Components/TopBar";
import ImageCarousel from "./Components/ImageCarousel";
import ProductInfo from "./Components/ProductInfo";
import AccordionSection from "./Components/AccordionSection";

export default function Main() {
  const { produto } = useProdutoHook();
  const { openIndex, handleToggle } = useAccordionHook();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-4">
        <TopBar category={produto.category} backHref="/" />

        <ImageCarousel images={produto.images} />

        <ProductInfo
          reference={produto.reference}
          badge={produto.badge}
          promotionBadge={produto.promotionBadge}
          brand={produto.brand}
          title={produto.title}
          originalPrice={produto.originalPrice}
          price={produto.price}
          installment={produto.installment}
          pixPrice={produto.pixPrice}
        />

        <AccordionSection items={produto.accordionItems} openIndex={openIndex} handleToggle={handleToggle} />
    </div>
  );
}
