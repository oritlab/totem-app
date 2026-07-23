import Link from "next/link";

import { MenuDrawerProps } from "../types/global";

export default function MenuDrawer(props: MenuDrawerProps) {
  const { modalMenu, handleModal } = props;

  if (!modalMenu.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => handleModal("close")}
      />

      <nav className="relative flex h-full w-[85vw] max-w-90 flex-col overflow-y-auto bg-white p-2">
        <button
          className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm tracking-widest text-zinc-800"
          onClick={() => handleModal("close")}
        >
          Fechar
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.39922 18.3002L5.69922 17.6002L11.2992 12.0002L5.69922 6.4002L6.39922 5.7002L11.9992 11.3002L17.5992 5.7002L18.2992 6.4002L12.6992 12.0002L18.2992 17.6002L17.5992 18.3002L11.9992 12.7002L6.39922 18.3002Z"
              fill="#000000"
            />
          </svg>
        </button>

        <ul className="flex flex-1 flex-col pb-2">
          <li className="border-b border-black">
            <Link href="/" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              INÍCIO
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/sale" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              SALE ATÉ 30% OFF
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/novidades" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              NOVIDADES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/vintage" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              VINTAGE
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/diamantes" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              DIAMANTES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/marcas-iconicas" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              MARCAS ICÔNICAS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/relogios" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
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
            <Link href="/produtos/aneis" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              ANÉIS E ALIANÇAS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/brincos" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              BRINCOS
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/colares" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              COLARES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/pingentes" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              PINGENTES
            </Link>
          </li>
          <li className="border-b border-black">
            <Link href="/produtos/pulseiras" className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
              PULSEIRAS
            </Link>
          </li>
        </ul>

        <div className="px-4 pb-4">
          <Link
            href="https://www.orit.com.br/"
            className="flex w-full cursor-pointer items-center justify-center rounded-sm bg-black px-6 py-3 text-xs tracking-widest text-white"
          >
            VISITE NOSSO SITE
          </Link>
        </div>
      </nav>
    </div>
  );
}
