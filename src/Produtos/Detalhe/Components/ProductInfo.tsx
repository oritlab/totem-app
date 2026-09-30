import { ProductInfoProps } from "../types";
import { capitalizeSentence, formatBrandName } from "@/src/global/utils/formatText";
import PriceInfo from "./PriceInfo";

export default function ProductInfo(props: ProductInfoProps) {
  const { produto, productTag } = props;

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
          {productTag && (
            <span
              className="rounded-sm px-2 py-0.5 pb-0 text-[10px] tracking-wide"
              style={{ backgroundColor: productTag.backgroundColor, color: productTag.textColor }}
            >
              {productTag.text}
            </span>
          )}
          {!productTag && produto.promotionBadge && (
            // Selo do desconto de campanha (PriceDiscountCampaigns) — só aparece
            // enquanto houver desconto ativo (hoje: Dia do Cliente, até 01/10 07h59).
            <span className="rounded border border-[#870A04] bg-[#870A04] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white pb-0">
              {produto.promotionBadge}
            </span>
          )}
        </div>
        <span className="text-md text-[#626262]">{formatBrandName(produto.brand)}</span>
        <span className="text-md text-zinc-800">
          {capitalizeSentence(produto.title)}
        </span>
      </div>

      <PriceInfo produto={produto} />
    </div>
  );
}
