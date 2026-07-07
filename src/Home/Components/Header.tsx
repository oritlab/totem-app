import Image from "next/image";
import Link from "next/link";

import { HeaderProps } from "../types";

export default function Header(props: HeaderProps) {
  const { handleModal } = props;

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <Link href="/">
        <Image
          src="/logo.svg"
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
        <span className={`h-0.5 w-5 bg-white sm:w-6 `}  />
        <span className={`h-0.5 w-5 bg-white sm:w-6 `} />
        <span className={`h-0.5 w-5 bg-white sm:w-6 `} />
      </button>
    </header>
  );
}
