import Header from "./Components/Header";
import Tile from "./Components/Tile";
import PromoBanner from "./Components/PromoBanner";

const RING_IMAGE = "/images/aneis.jpg";

export default function Main() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />

      <main className="grid grid-cols-3 gap-1 p-1">
        <Tile label="SALE ATÉ 50% OFF" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="RELÓGIOS" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="NOVIDADES" imageSrc={RING_IMAGE} className="aspect-square" />

        <Tile label="VINTAGE" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="DIAMANTES" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="MARCAS ICÔNICAS" imageSrc={RING_IMAGE} className="aspect-square" />

        <PromoBanner
          imageSrc={RING_IMAGE}
          imageOpacityClassName="opacity-20"
          title={"360 dias para\ncomeçar de novo"}
          subtitle="Troque suas peças em 360 dias"
          titleClassName="text-zinc-800"
        />
        <Tile label="ANÉIS" imageSrc={RING_IMAGE} className="aspect-square" />

        <Tile label="BRINCOS" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="COLARES" imageSrc={RING_IMAGE} className="aspect-square" />
        <Tile label="PINGENTES" imageSrc={RING_IMAGE} className="aspect-square" />

        <Tile
          label="PULSEIRAS"
          imageSrc={RING_IMAGE}
          className="aspect-square"
          labelClassName="items-end pb-4"
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
