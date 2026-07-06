import Image from "next/image";

import { HeroProps } from "../types";
import Header from "./Header";

export default function Hero(props: HeroProps) {
  const { imageSrc } = props;

  return (
    <div className="relative aspect-[2.1/1] w-full overflow-hidden">
      <Image src={imageSrc} alt="Orit" fill priority sizes="100vw" className="object-cover" />
      <Header />
    </div>
  );
}
