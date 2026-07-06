import Image from "next/image";
import Link from "next/link";

import { TileProps } from "../types";

export default function Tile(props: TileProps) {
  const { label, imageSrc, href, subtitle, labelClassName = "" } = props;

  return (
    <Link href={href} className="relative aspect-square w-full cursor-pointer overflow-hidden">
      <Image src={imageSrc} alt={label} fill sizes="33vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-white ${labelClassName}`}
      >
        <span className={`${label === "SALE" ? "pl-[0.25em] text-7xl tracking-[0.5em] font-serif mb-2 font-light" : "text-3xl" }`}>{label}</span>
        {subtitle && <span className="pl-[0.25em] text-md tracking-[0.5em]">{subtitle}</span>}
      </div>
    </Link>
  );
}
