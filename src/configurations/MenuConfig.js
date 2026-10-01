// Itens do menu lateral (MenuDrawer), na ordem de exibição. Campanhas podem
// esconder ou renomear um item por período — ver Campaign/MenuItemCampaigns.js.
/** @type {import("@/src/global/types/global").MenuItem[]} */
export const MenuItems = [
  { id: "inicio", label: "INÍCIO", href: "/" },
  { id: "novidades", label: "NOVIDADES", href: "/produtos/novidades" },
  { id: "escolhas-orit", label: "ESCOLHAS ORIT", href: "/produtos/escolhas-orit" },
  { id: "vintage", label: "VINTAGE", href: "/produtos/vintage" },
  { id: "diamantes", label: "DIAMANTES", href: "/produtos/diamantes" },
  { id: "marcas-iconicas", label: "MARCAS ICÔNICAS", href: "/produtos/marcas-iconicas" },
  { id: "relogios", label: "RELÓGIOS", href: "/produtos/relogios" },
  { id: "aneis", label: "ANÉIS E ALIANÇAS", href: "/produtos/aneis" },
  { id: "brincos", label: "BRINCOS", href: "/produtos/brincos" },
  { id: "colares", label: "COLARES", href: "/produtos/colares" },
  { id: "pingentes", label: "PINGENTES", href: "/produtos/pingentes" },
  { id: "pulseiras", label: "PULSEIRAS", href: "/produtos/pulseiras" },
];
