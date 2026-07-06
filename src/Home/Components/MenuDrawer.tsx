import Link from "next/link";

import { MenuDrawerProps } from "../types";

export default function MenuDrawer(props: MenuDrawerProps) {
  const { modalMenu, handleModal, accordionJoias, handleAccordion } = props;

  if (!modalMenu.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => handleModal("close")}
      />

      <nav className="relative flex h-full w-[85vw] max-w-90 flex-col overflow-y-auto rounded-bl-[20px] bg-white p-2 sm:rounded-bl-[30px]">
        <button
          className="cursor-pointer px-6 py-4 text-left text-sm tracking-widest text-zinc-800"
          onClick={() => handleModal("close")}
        >
          Fechar X
        </button>

        <ul className="flex flex-1 flex-col pb-2">
          <li className="border-b border-black">
            <Link href="/" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              ÍNICIO
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              SALE ATÉ 30% OFF
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              NOVIDADES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              VINTAGE
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              DIAMANTES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              MARCAS ICÔNICAS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              RELÓGIOS
            </Link>
          </li>
          {/* <li className="border-b border-black">
            <button
              className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm text-zinc-800"
              onClick={() => handleAccordion("toggle")}
            >
              JOIAS
              <span>{accordionJoias.open ? "-" : "+"}</span>
            </button>

            {accordionJoias.open && (
              <ul className="flex flex-col pb-2">
                <li>
                  <Link href="#" className="block cursor-pointer px-10 py-2 text-sm text-zinc-600">
                    Anéis e Alianças
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block cursor-pointer px-10 py-2 text-sm text-zinc-600">
                    Brincos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block cursor-pointer px-10 py-2 text-sm text-zinc-600">
                    Colares
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block cursor-pointer px-10 py-2 text-sm text-zinc-600">
                    Pingentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block cursor-pointer px-10 py-2 text-sm text-zinc-600">
                    Pulseiras
                  </Link>
                </li>
              </ul>
            )}
          </li> */}
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              ANÉIS E ALIANÇAS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              BRINCOS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              COLARES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              PINGENTES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="#" className="block cursor-pointer px-6 py-4 text-sm text-zinc-800">
              PULSEIRAS
            </Link>
          </li>
        </ul>

        <div className="px-4 pb-4">
          <Link
            href="#"
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-black px-6 py-3 text-xs tracking-widest text-white"
          >
            ECOMMERCE
          </Link>
        </div>
      </nav>
    </div>
  );
}
