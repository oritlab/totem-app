"use client";

import Image from "next/image";
import Link from "next/link";

import { formatBRL } from "@/src/global/utils/formatPrice";
import { capitalizeFirst, formatBrandName } from "@/src/global/utils/formatText";
import useProductImageHook from "../Hooks/useProductImageHook";
import { ProductCardProps } from "../types";

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const isPromo = !!product.listPrice && product.listPrice > product.price;
  const { imgSrc, loaded, handleImage } = useProductImageHook(product.imageUrl);

  return (
    <Link href={`/info-product/${product.sku}`} className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
        {/* Selo campanha Dia do Cliente (14/09–30/09), fixo em todos os cards
            independente do preço vindo da API — após 30/09 reverter para
            {isPromo && (<span className="... bg-orange-600 ... rounded-sm ...">{discountPercent}% OFF</span>)},
            reimportando calculateDiscountPercent de @/src/global/utils/formatPrice */}
        <span className="absolute left-2 top-2 z-10 bg-[#870A04] px-2 py-1 text-[10px] font-bold rounded tracking-wide text-white">
          10% OFF
        </span>
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
        <span className="text-sm font-semibold text-zinc-900" style={{ color: "#000000" }}>
          {capitalizeFirst(product.name)}
        </span>

        {isPromo ? (
          <span className="flex items-baseline gap-3 flex-col">
            <span className="text-xs text-zinc-600 line-through">
              de {formatBRL(product.listPrice as number)}
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
