import Image from "next/image";
import Link from "next/link";

import { TileProps } from "../types";

export default function Tile(props: TileProps) {
  const { label, imageSrc, href, labelClassName = "" } = props;

  return (
    <Link href={href} className="relative aspect-square w-full cursor-pointer overflow-hidden">
      <Image src={imageSrc} alt={label} fill sizes="33vw" className="object-cover" />
      {/* <div className="absolute inset-0 bg-black/30" /> */}
      {/* <span
        className={`absolute inset-0 flex items-center justify-center text-center font-serif text-xl tracking-widest text-white ${labelClassName}`}
      >
        {label}
      </span> */}
    </Link>
  );
}
