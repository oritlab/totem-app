import Image from "next/image";

import { ProductInfoProps } from "../types";
import Pix from "@/public/pix.svg";
import { capitalizeFirst, formatBrandName } from "@/src/global/utils/formatText";

export default function ProductInfo(props: ProductInfoProps) {
  const { produto } = props;

  return (
    <div className="flex flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-md text-[#626262]">Ref: {produto.reference}</span>
          {produto.badge && (
            <span className="rounded-sm border border-[#626262] px-2 py-0.5 text-[10px] tracking-wide text-[#626262] pb-0">
              {produto.badge}
            </span>
          )}
          {produto.promotionBadge && (
            <span className="rounded-sm border border-[#FF5B00] bg-[#FF5B00] px-2 py-0.5 text-[10px] tracking-wide text-white pb-0">
              {produto.promotionBadge}
            </span>
          )}
        </div>
        <span className="text-md text-[#626262]">{formatBrandName(produto.brand)}</span>
        <span className="text-md font-medium text-black">
          {capitalizeFirst(produto.title)}
        </span>
      </div>

      <div className="flex flex-col gap-1 text-right">
        {produto.originalPrice && (
          <span className="text-sm text-black">
            de <span className="line-through">{produto.originalPrice}</span> por
          </span>
        )}
        <span className="text-2xl font-normal text-black">{produto.price}</span>
        <span className="text-sm text-black">{produto.installment}</span>
        <span className="flex items-center gap-1 text-sm text-black">
          ou {produto.pixPercent}% de OFF no Pix
          <Image src={Pix} width={15} height={15} alt="pix" />
          <span className="font-bold text-black">{produto.pixPrice}</span>
        </span>
      </div>
    </div>
  );
}
