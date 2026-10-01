// Ajustes de campanha no menu lateral. Na janela (início de startPhase → fim
// de endPhase), o item com o menuItemId indicado é:
//   hidden: true      → escondido do menu
//   label / href      → renomeado e/ou com outro destino
// Vale o primeiro ajuste ativo de cada item; fora das janelas, o item volta
// ao padrão de MenuConfig.js.
/** @type {import("@/src/global/types/global").MenuItemCampaign[]} */
export const MenuItemCampaigns = [
  {
    // Fases 1-2: o 1º card da home (padrão Escolhas Orit) virou a Private Sale.
    id: "blackfriday-2026-hide-escolhas-orit",
    menuItemId: "escolhas-orit",
    startPhase: "phase1",
    endPhase: "phase2",
    hidden: true,
  },
  {
    id: "blackfriday-2026-menu-black-friday",
    menuItemId: "escolhas-orit",
    startPhase: "phase3",
    endPhase: "phase4",
    hidden: false,
    label: "BLACK FRIDAY",
    href: "/produtos/escolhas-orit",
  },
];
