import { useEffect, useRef, useState } from "react";

// Compartilhado entre Home e Listagem — cada Main.jsx chama esse hook e
// passa o resultado como props pro Header (que é único, ver
// Components/Header.tsx). Nenhum componente além de Main.jsx pode chamar
// hooks diretamente.
export default function useMenuDrawerHook() {
  // 1. States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 2. Funções de API — N/A

  // 3. useEffect — fecha o menu ao clicar fora dele
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // 4. Handlers
  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  // 5. return — só o que o componente consome, nunca o setter
  return { isMenuOpen, menuRef, handleOpenMenu, handleCloseMenu };
}
