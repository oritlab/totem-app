import Image from "next/image";

import { HeaderProps } from "../types";

export default function Header(props: HeaderProps) {
  const { handleModal } = props;

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4">
      <Image
        src="/logo.svg"
        alt="Orit"
        width={100}
        height={100}
        priority
        className="h-14 w-auto"
      />
      <button
        aria-label="Menu"
        className="flex cursor-pointer flex-col gap-1.5"
        onClick={() => handleModal("open")}
      >
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>
    </header>
  );
}
