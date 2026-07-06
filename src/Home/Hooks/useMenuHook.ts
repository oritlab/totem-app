"use client";

import { useState } from "react";

import { MenuState } from "../types";

export default function useMenuHook() {
  const [modalMenu, setModalMenu] = useState<MenuState>({ open: false });

  function handleModal(action: string) {
    if (action === "open") setModalMenu({ open: true });
    if (action === "close") setModalMenu({ open: false });
  }

  return { modalMenu, handleModal };
}
