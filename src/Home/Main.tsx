"use client";

import Hero from "./Components/Hero";
import Tile from "./Components/Tile";
import PromoBanner from "./Components/PromoBanner";
import MenuDrawer from "./Components/MenuDrawer";
import useMenuHook from "./Hooks/useMenuHook";
import useHomeMediaHook from "./Hooks/useHomeMediaHook";

export default function Main() {
  const { modalMenu, handleModal, accordionJoias, handleAccordion } = useMenuHook();
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
      <MenuDrawer
        modalMenu={modalMenu}
        handleModal={handleModal}
        accordionJoias={accordionJoias}
        handleAccordion={handleAccordion}
      />

      <Hero videoSrc={bannerVideo} modalMenu={modalMenu} handleModal={handleModal} />

      <main className="grid grid-cols-3">
        <Tile label="SALE" subtitle="ATÉ 30% OFF" imageSrc={imageSale} href="#" />
        <Tile label="RELÓGIOS" imageSrc={imageWatch} href="#" />
        <Tile label="NOVIDADES" imageSrc={imageNews} href="#" />

        <Tile label="VINTAGE" imageSrc={imageVintage} href="#" />
        <Tile label="DIAMANTES" imageSrc={imageDiamond} href="#" />
        <Tile label="MARCAS ICÔNICAS" imageSrc={imageMarcas} href="#" />

        <PromoBanner
          imageSrc={image360}
          // imageOpacityClassName="opacity-20"
          title={"360 dias para\ncomeçar de novo"}
          subtitle="Troque suas peças em 360 dias"
          titleClassName="text-zinc-800"
        />
        <Tile label="ANÉIS" imageSrc={imageRing} href="#" />

        <Tile label="BRINCOS" imageSrc={imageBrinco} href="#" />
        <Tile label="COLARES" imageSrc={imageColar} href="#" />
        <Tile label="PINGENTES" imageSrc={imagePingente} href="#" />

        <Tile
          label="PULSEIRAS"
          imageSrc={imagePulseira}
          href="#"
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
