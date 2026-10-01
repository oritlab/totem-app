"use client";

import { useState } from "react";

import { MenuItemCampaigns } from "@/src/configurations/Campaign/MenuItemCampaigns";
import { MenuItems } from "@/src/configurations/MenuConfig";
import useCampaignAccessHook from "@/src/global/hooks/useCampaignAccessHook";
import { getCampaignMenuItems } from "@/src/global/utils/campaign";
import { MenuState } from "../types";

export default function useMenuHook() {
  const [modalMenu, setModalMenu] = useState<MenuState>({ open: false });
  const campaignAccess = useCampaignAccessHook();

  // Itens do menu com os ajustes de campanha (esconder/renomear por fase).
  const menuItems = getCampaignMenuItems(MenuItems, MenuItemCampaigns, campaignAccess);

  function handleModal(action: string) {
    if (action === "open") setModalMenu({ open: true });
    if (action === "close") setModalMenu({ open: false });
  }

  return { modalMenu, menuItems, handleModal };
}
