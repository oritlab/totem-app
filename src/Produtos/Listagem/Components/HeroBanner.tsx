import Image from "next/image";

import Header from "@/src/global/components/Header";

import { CategoryBanner, HeaderProps } from "../types";

type HeroBannerProps = {
  banner: CategoryBanner;
} & Pick<HeaderProps, "handleModal">;

export default function HeroBanner(props: HeroBannerProps) {
  const { banner, handleModal } = props;
  const { imageUrl, title, subtitle, variant, align } = banner;
  const textOnRight = align === "right";

  if (variant === "split") {
    return (
      <div className="relative flex w-full items-stretch bg-[#f4f1ec] landscape:aspect-21/5 portrait:aspect-5/3 portrait:sm:aspect-20/9 portrait:lg:aspect-[2.625/1]">
        <div className="absolute inset-x-0 top-0 z-10">
          <Header theme="dark" handleModal={handleModal} />
        </div>

        <div className={`flex w-full ${textOnRight ? "flex-row" : "flex-row-reverse"}`}>
          <div className="flex flex-1 flex-col items-start justify-center gap-2 px-10 text-zinc-900">
            <h1 className="whitespace-pre-line font-serif text-6xl uppercase">{title}</h1>
            {subtitle && <p className="max-w-md text-xs text-zinc-600">{subtitle}</p>}
          </div>

          {imageUrl && (
            <div className="relative flex-1">
              <Image src={imageUrl} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-3/1 w-full overflow-hidden bg-black landscape:aspect-21/5 portrait:aspect-5/3 portrait:sm:aspect-20/9 portrait:lg:aspect-[2.625/1]">
      {imageUrl && (
        <>
          <Image src={imageUrl} alt="" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/10 to-black/40" />
        </>
      )}

      <div className="absolute inset-x-0 top-0 z-10">
        <Header handleModal={handleModal} />
      </div>

      <div
        className={`absolute inset-0 flex flex-col justify-center gap-2 px-10 text-white ${
          textOnRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <h1 className="whitespace-pre-line font-serif text-6xl uppercase">{title}</h1>
        {subtitle && <p className="max-w-md text-xs text-white/80">{subtitle}</p>}
      </div>
    </div>
  );
}
