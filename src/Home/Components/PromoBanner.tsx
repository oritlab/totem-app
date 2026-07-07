import Image from "next/image";

import { PromoBannerProps } from "../types";

export default function PromoBanner(props: PromoBannerProps) {
  const { imageSrc, title, subtitle, titleClassName } = props;

  return (
    <div className="relative col-span-2 flex aspect-2/1 w-full items-center justify-center overflow-hidden bg-zinc-100">
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="66vw"
        className={`object-cover`}
      />
      {/* <div className="relative flex flex-col items-center gap-2 text-center">
        <span className={`whitespace-pre-line font-serif text-2xl italic ${titleClassName}`}>
          {title}
        </span>
        <span className="whitespace-pre-line text-sm text-zinc-600">{subtitle}</span>
      </div> */}
    </div>
  );
}
