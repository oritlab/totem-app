"use client";

import Image from "next/image";
import Link from "next/link";

import { formatBRL } from "@/src/global/utils/formatPrice";
import { capitalizeSentence, formatBrandName } from "@/src/global/utils/formatText";
import Strikethrough from "@/src/global/components/Strikethrough";
import useProductImageHook from "../Hooks/useProductImageHook";
import { ProductCardProps } from "../types";

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const { imgSrc, loaded, handleImage } = useProductImageHook(product.imageUrl);

  return (
    <Link href={`/info-product/${product.sku}`} className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
        {!!product.discountPercent && (
          // Selo campanha Dia do Cliente (14/09–30/09) — reverter para
          // "bg-orange-600 ... rounded-sm ... font-semibold" após 30/09
          <span className="absolute left-2 top-2 z-10 bg-[#870A04] px-2 py-1 text-[10px] font-bold rounded tracking-wide text-white">
            {product.discountPercent}% OFF
          </span>
        )}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-zinc-100 via-zinc-200 to-zinc-100" />
        )}
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(orientation: landscape) 33vw, 50vw"
          className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => handleImage("load")}
          onError={() => handleImage("error")}
        />
      </div>

      <div className="flex flex-col gap-3 font-outfit">
        <span className="text-sm text-[#626262]">{formatBrandName(product.brand)}</span>
        {/* Mesma classe do site (h3 "line-clamp-1 text-[14px] lg:text-base"),
            trocando my-2 por gap-3 do pai — espaçamento por gap tem preferência
            sobre margin nas regras de estilo do projeto */}
        <span className="line-clamp-1 text-[14px] text-zinc-800 lg:text-base">
          {capitalizeSentence(product.name)}
        </span>

        {product.discountPercent ? (
          <span className="flex items-baseline gap-3 flex-col">
            <span className="text-xs text-zinc-600">
              de <Strikethrough>{formatBRL(product.listPrice as number)}</Strikethrough>
            </span>
            <span className="text-sm font-medium text-zinc-900">
              por {formatBRL(product.price)}
            </span>
          </span>
        ) : (
          <span className="text-sm font-medium text-zinc-900">
            {formatBRL(product.price)}
          </span>
        )}
      </div>
    </Link>
  );
}
