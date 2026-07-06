"use client";

import { useState } from "react";

import { MenuState, AccordionState } from "../types";

export default function useMenuHook() {
  const [modalMenu, setModalMenu] = useState<MenuState>({ open: false });
  const [accordionJoias, setAccordionJoias] = useState<AccordionState>({ open: false });

  function handleModal(action: string) {
    if (action === "open") setModalMenu({ open: true });
    if (action === "close") setModalMenu({ open: false });
  }

  function handleAccordion(action: string) {
    if (action === "open") setAccordionJoias({ open: true });
    if (action === "close") setAccordionJoias({ open: false });
    if (action === "toggle") setAccordionJoias({ open: !accordionJoias.open });
  }

  return { modalMenu, handleModal, accordionJoias, handleAccordion };
}
