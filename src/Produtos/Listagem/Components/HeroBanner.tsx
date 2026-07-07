import Image from "next/image";

import Header, { HeaderProps } from "@/src/shared/Components/Header";

import { CategoryBanner } from "../types";

type HeroBannerProps = CategoryBanner &
  Pick<HeaderProps, "isMenuOpen" | "menuRef" | "onOpenMenu" | "onCloseMenu">;

export default function HeroBanner(props: HeroBannerProps) {
  const { imageUrl, title, subtitle, variant, align, isMenuOpen, menuRef, onOpenMenu, onCloseMenu } = props;
  const textOnRight = align === "right";

  if (variant === "split") {
    return (
      <div className="relative flex w-full items-stretch bg-[#f4f1ec] landscape:aspect-[21/5] portrait:aspect-[4/3]">
        <div className="absolute inset-x-0 top-0 z-10">
          <Header
            theme="dark"
            isMenuOpen={isMenuOpen}
            menuRef={menuRef}
            onOpenMenu={onOpenMenu}
            onCloseMenu={onCloseMenu}
          />
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
    <div className="relative aspect-[3/1] w-full overflow-hidden bg-black landscape:aspect-[21/5] portrait:aspect-[4/3]">
      {imageUrl && (
        <>
          <Image src={imageUrl} alt="" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/40" />
        </>
      )}

      <div className="absolute inset-x-0 top-0 z-10">
        <Header
          isMenuOpen={isMenuOpen}
          menuRef={menuRef}
          onOpenMenu={onOpenMenu}
          onCloseMenu={onCloseMenu}
        />
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
