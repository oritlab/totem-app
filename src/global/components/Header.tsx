"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/Orit-log-atualizado.png"
import LogoScrolled from "../../../public/Orit-log-Laranja.png"

import { HeaderProps } from "../types/global";
import useHeaderScrollHook from "../hooks/useHeaderScrollHook";

export default function Header(props: HeaderProps) {
  const { theme = "light", handleModal } = props;
  const { isScrolled } = useHeaderScrollHook();

  const backgroundClassName = isScrolled ? "bg-white" : "bg-transparent";
  const barClassName = isScrolled ? "bg-black" : theme === "dark" ? "bg-zinc-900" : "bg-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 transition-colors sm:px-6 sm:py-4 ${backgroundClassName}`}
    >
      <Link href="/" className="relative h-9 w-[61px] sm:h-11 sm:w-[74px] md:h-14 md:w-[95px]">
        <Image
          src={Logo}
          alt="Orit"
          fill
          priority
          className={`object-contain object-left transition-opacity ${isScrolled ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={LogoScrolled}
          alt="Orit"
          fill
          priority
          className={`object-contain object-left transition-opacity ${isScrolled ? "opacity-100" : "opacity-0"}`}
        />
      </Link>
      <button
        aria-label="Menu"
        className="flex cursor-pointer flex-col gap-1 sm:gap-1.5"
        onClick={() => handleModal("open")}
      >
        <span className={`h-0.5 w-5 transition-colors sm:w-6 ${barClassName}`} />
        <span className={`h-0.5 w-5 transition-colors sm:w-6 ${barClassName}`} />
        <span className={`h-0.5 w-5 transition-colors sm:w-6 ${barClassName}`} />
      </button>
    </header>
  );
}
