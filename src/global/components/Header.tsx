import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/Orit-log-atualizado.png"

import { HeaderProps } from "../types/global";

const LOGO_LIGHT_SRC = "https://orit.fbitsstatic.net/sf/img/header/logoorit.png?theme=main&v=202607060824";
const LOGO_DARK_SRC = "/logo-dark.svg";

export default function Header(props: HeaderProps) {
  const { theme = "light", handleModal } = props;
  const barClassName = theme === "dark" ? "bg-zinc-900" : "bg-white";

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <Link href="/">
        <Image
          src={Logo}
          alt="Orit"
          width={100}
          height={100}
          priority
          className="h-9 w-auto sm:h-11 md:h-14"
        />
      </Link>
      <button
        aria-label="Menu"
        className="flex cursor-pointer flex-col gap-1 sm:gap-1.5"
        onClick={() => handleModal("open")}
      >
        <span className={`h-0.5 w-5 sm:w-6 ${barClassName}`} />
        <span className={`h-0.5 w-5 sm:w-6 ${barClassName}`} />
        <span className={`h-0.5 w-5 sm:w-6 ${barClassName}`} />
      </button>
    </header>
  );
}
