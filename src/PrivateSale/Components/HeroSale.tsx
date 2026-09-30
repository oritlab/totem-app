import Image from "next/image";

import Header from "@/src/global/components/Header";
import { HeroSaleProps } from "../types";

export default function HeroSale(props: HeroSaleProps) {
  const { imageSrc, handleModal } = props;

  // Proporção fixa da arte (1080x599): a imagem aparece inteira, sem corte,
  // em qualquer largura — no totem vertical ocupa a largura toda.
  return (
    <section className="relative aspect-1080/599 w-full shrink-0 overflow-hidden bg-zinc-900">
      {imageSrc && (
        <Image src={imageSrc} alt="Private Sale Black Friday" fill priority sizes="100vw" className="object-cover" />
      )}

      <Header handleModal={handleModal} />
    </section>
  );
}
