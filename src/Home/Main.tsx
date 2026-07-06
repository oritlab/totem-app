import Header from "@/src/shared/Components/Header";
import Tile from "./Components/Tile";
import PromoBanner from "./Components/PromoBanner";

const RING_IMAGE = "/images/aneis.jpg";

export default function Main() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />

      <main className="grid grid-cols-3 gap-1 p-1">
        <Tile label="SALE ATÉ 50% OFF" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="RELÓGIOS" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/relogios" />
        <Tile label="NOVIDADES" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/novidades" />

        <Tile label="VINTAGE" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/vintage" />
        <Tile label="DIAMANTES" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/diamantes" />
        <Tile
          label="MARCAS ICÔNICAS"
          imageSrc={RING_IMAGE}
          className="aspect-square"
          href="/produtos/marcas-iconicas"
        />

        <PromoBanner
          imageSrc={RING_IMAGE}
          imageOpacityClassName="opacity-20"
          title={"360 dias para\ncomeçar de novo"}
          subtitle="Troque suas peças em 360 dias"
          titleClassName="text-zinc-800"
        />
        <Tile label="ANÉIS" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/aneis" />

        <Tile label="BRINCOS" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/brincos" />
        <Tile label="COLARES" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/colares" />
        <Tile label="PINGENTES" imageSrc={RING_IMAGE} className="aspect-square" href="/produtos/pingentes" />

        <Tile
          label="PULSEIRAS"
          imageSrc={RING_IMAGE}
          className="aspect-square"
          labelClassName="items-end pb-4"
          href="/produtos/pulseiras"
        />
        <PromoBanner
          imageSrc={RING_IMAGE}
          imageOpacityClassName="opacity-10"
          title={"COMPRAMOS SUAS\nJOIAS E RELÓGIOS"}
          subtitle={"VENHA CONHECER NOSSA · 30% DE DESCONTO\nNA AVALIAÇÃO DE SUAS MERCADORIAS"}
          titleClassName="text-orange-700"
        />
      </main>
    </div>
  );
}
