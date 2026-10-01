import Link from "next/link";

import { MenuDrawerProps } from "../types/global";

export default function MenuDrawer(props: MenuDrawerProps) {
  const { modalMenu, menuItems, handleModal } = props;

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

        {/* Itens vêm de src/configurations/MenuConfig.js, com os ajustes de
            campanha de src/configurations/Campaign/MenuItemCampaigns.js */}
        <ul className="flex flex-1 flex-col pb-2">
          {menuItems.map(function (menuItem) {
            return (
              <li key={menuItem.id} className="border-b border-black">
                <Link href={menuItem.href} className="block cursor-pointer px-6 py-3 text-sm text-zinc-800">
                  {menuItem.label}
                </Link>
              </li>
            );
          })}
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
