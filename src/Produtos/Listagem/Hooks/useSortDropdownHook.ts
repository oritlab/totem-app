import { useEffect, useRef, useState } from "react";

export default function useSortDropdownHook() {
  // 1. States
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Funções de API — N/A

  // 3. useEffect — fecha o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. Handlers
  function handleToggle() {
    setIsOpen((open) => !open);
  }

  function handleClose() {
    setIsOpen(false);
  }

  // 5. return — só o que o componente consome, nunca o setter
  return { isOpen, dropdownRef, handleToggle, handleClose };
}
