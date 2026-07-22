import Image from "next/image";

import { PriceInfoProps } from "../types";
import Pix from "@/public/pix.svg";

export default function PriceInfo(props: PriceInfoProps) {
  const { produto } = props;

  return (
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
  );
}
