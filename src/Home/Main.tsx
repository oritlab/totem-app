"use client";

import MenuDrawer from "@/src/global/components/MenuDrawer";
import useCategoriesHook from "@/src/Produtos/Listagem/Hooks/useCategoriesHook";

import useMenuHook from "./Hooks/useMenuHook";
import useHomeMediaHook from "./Hooks/useHomeMediaHook";
import Hero from "./Components/Hero";
import Tile from "./Components/Tile";
import PromoBanner from "./Components/PromoBanner";

export default function Main() {
  const { modalMenu, handleModal } = useMenuHook();
  // Só prefetch: aquece o cache de GET /api/v1/categories (ver
  // Produtos/Listagem/API/CategoriesAPI.ts) pra tela de listagem não
  // precisar esperar essa chamada de novo ao tocar num tile. O grid
  // continua 100% curado (imagens/posições/SALE/promo banners) — não
  // renderiza nada a partir dessa lista.
  useCategoriesHook();
  const {
    bannerVideo,
    imageSale,
    imageWatch,
    imageNews,
    imageVintage,
    imageDiamond,
    imageMarcas,
    image360,
    imageRing,
    imageBrinco,
    imageColar,
    imagePingente,
    imagePulseira,
    imageBuy,
  } = useHomeMediaHook();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-auto bg-white">
      <MenuDrawer modalMenu={modalMenu} handleModal={handleModal} />

      <Hero videoSrc={bannerVideo} handleModal={handleModal} />

      <main className="grid grid-cols-3">
        <Tile label="SALE" subtitle="ATÉ 30% OFF" imageSrc={imageSale} href="/produtos/sale" />
        <Tile label="RELÓGIOS" imageSrc={imageWatch} href="/produtos/relogios" />
        <Tile label="NOVIDADES" imageSrc={imageNews} href="/produtos/novidades" />

        <Tile label="VINTAGE" imageSrc={imageVintage} href="/produtos/vintage" />
        <Tile label="DIAMANTES" imageSrc={imageDiamond} href="/produtos/diamantes" />
        <Tile label="MARCAS ICÔNICAS" imageSrc={imageMarcas} href="/produtos/marcas-iconicas" />

        <PromoBanner
          imageSrc={image360}
          // imageOpacityClassName="opacity-20"
          title={"360 dias para\ncomeçar de novo"}
          subtitle="Troque suas peças em 360 dias"
          titleClassName="text-zinc-800"
        />
        <Tile label="ANÉIS" imageSrc={imageRing} href="/produtos/aneis" />

        <Tile label="BRINCOS" imageSrc={imageBrinco} href="/produtos/brincos" />
        <Tile label="COLARES" imageSrc={imageColar} href="/produtos/colares" />
        <Tile label="PINGENTES" imageSrc={imagePingente} href="/produtos/pingentes" />

        <Tile
          label="PULSEIRAS"
          imageSrc={imagePulseira}
          href="/produtos/pulseiras"
          labelClassName=""
        />
        <PromoBanner
          imageSrc={imageBuy}
          // imageOpacityClassName="opacity-10"
          title={"COMPRAMOS SUAS\nJOIAS E RELÓGIOS"}
          subtitle={"VENHA CONHECER NOSSA · 30% DE DESCONTO\nNA AVALIAÇÃO DE SUAS MERCADORIAS"}
          titleClassName="text-orange-700"
        />
      </main>
    </div>
  );
}
