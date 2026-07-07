import Image from "next/image";
import Link from "next/link";

import { formatBRL } from "@/src/global/utils/formatPrice";
import { ProductCardProps } from "../types";

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const isPromo = !!product.listPrice && product.listPrice > product.price;

  return (
    <Link href={`/produto/${product.sku}`} className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50">
        {isPromo && (
          <span className="absolute left-2 top-2 z-10 bg-orange-600 px-2 py-1 text-[10px] font-semibold tracking-wide text-white">
            PROMOÇÃO
          </span>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(orientation: landscape) 33vw, 50vw"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-col gap-3 font-outfit">
        <span className="text-xl text-zinc-600">{product.brand}</span>
        <span className="text-sm font-semibold text-zinc-900" style={{ color: "#000000" }}>
          {product.name}
        </span>

        {isPromo ? (
          <span className="flex items-baseline gap-3 flex-col">
            <span className="text-xs text-zinc-600 line-through">
              de {formatBRL(product.listPrice as number)}
            </span>
            <span className="text-sm font-semibold text-zinc-900">
              por {formatBRL(product.price)}
            </span>
          </span>
        ) : (
          <span className="text-sm font-medium">
            {formatBRL(product.price)}
          </span>
        )}
      </div>
    </Link>
  );
}
