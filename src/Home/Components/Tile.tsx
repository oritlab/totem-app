import Image from "next/image";
import Link from "next/link";

import { TileProps } from "../types";

export default function Tile(props: TileProps) {
  const { label, imageSrc, className, labelClassName = "", href } = props;

  const content = (
    <>
      <Image
        src={imageSrc}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <span
        className={`absolute inset-0 flex items-center justify-center text-center font-serif text-lg tracking-widest text-white sm:text-xl ${labelClassName}`}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`relative block overflow-hidden ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`relative overflow-hidden ${className}`}>{content}</div>;
}
