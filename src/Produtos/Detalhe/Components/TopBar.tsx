import Image from "next/image";

import { TopBarProps } from "../types";

export default function TopBar(props: TopBarProps) {
  const { category, handleRedirect } = props;

  return (
    <div className="flex items-center justify-between px-4 py-3 text-xs sm:px-6 sm:text-sm">
      <div className="flex items-center gap-6 text-[#626262] font-medium">
        <button type="button" onClick={handleRedirect} className="cursor-pointer">
          Voltar
        </button>
        <span className="text-black">|</span>
        <span>{category}</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <span className="tracking-wide text-[#FFA979]">
          SECONDHAND
        </span>
        <span className="tracking-wide text-[#FFA979]">
          Troque em até 360 dias
        </span>
        <Image src="/orit-360.svg" alt="Orit 360" width={60} height={60} />
      </div>
    </div>
  );
}
