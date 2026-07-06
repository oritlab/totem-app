import Hero from "./Components/Hero";
import Tile from "./Components/Tile";
import PromoBanner from "./Components/PromoBanner";

const BANNER_IMAGE = "/banner.svg";
const IMAGE_SALE = "/sale.svg"
const IMAGE_WATCH = "/relogio.svg"
const IMAGE_NEWS = "/news.svg"
const IMAGE_VINTAGE = "/vintage.svg"
const IMAGE_DIAMOND = "/diamond.svg"
const IMAGE_MARCAS = "/marcas.svg"
const IMAGE_360 = "/360.svg"
const RING_IMAGE = "/aneis.svg";
const IMAGE_BRINCO = "/brinco.svg"
const IMAGE_COLAR = "/colares.svg"
const IMAGE_PINGENTE = "/pingente.svg"
const IMAGE_PULSEIRA = "/pulseira.svg"
const IMAGE_BUY = "/buy.svg"

export default function Main() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-auto bg-white">
      <Hero imageSrc={BANNER_IMAGE} />

      <main className="grid grid-cols-3">
        <Tile label="SALE ATÉ 50% OFF" imageSrc={IMAGE_SALE} href="#" />
        <Tile label="RELÓGIOS" imageSrc={IMAGE_WATCH} href="#" />
        <Tile label="NOVIDADES" imageSrc={IMAGE_NEWS} href="#" />

        <Tile label="VINTAGE" imageSrc={IMAGE_VINTAGE} href="#" />
        <Tile label="DIAMANTES" imageSrc={IMAGE_DIAMOND} href="#" />
        <Tile label="MARCAS ICÔNICAS" imageSrc={IMAGE_MARCAS} href="#" />

        <PromoBanner
          imageSrc={IMAGE_360}
          // imageOpacityClassName="opacity-20"
          title={"360 dias para\ncomeçar de novo"}
          subtitle="Troque suas peças em 360 dias"
          titleClassName="text-zinc-800"
        />
        <Tile label="ANÉIS" imageSrc={RING_IMAGE} href="#" />

        <Tile label="BRINCOS" imageSrc={IMAGE_BRINCO} href="#" />
        <Tile label="COLARES" imageSrc={IMAGE_COLAR} href="#" />
        <Tile label="PINGENTES" imageSrc={IMAGE_PINGENTE} href="#" />

        <Tile
          label="PULSEIRAS"
          imageSrc={IMAGE_PULSEIRA}
          href="#"
          labelClassName="items-end pb-4"
        />
        <PromoBanner
          imageSrc={IMAGE_BUY}
          // imageOpacityClassName="opacity-10"
          title={"COMPRAMOS SUAS\nJOIAS E RELÓGIOS"}
          subtitle={"VENHA CONHECER NOSSA · 30% DE DESCONTO\nNA AVALIAÇÃO DE SUAS MERCADORIAS"}
          titleClassName="text-orange-700"
        />
      </main>
    </div>
  );
}
