import { useState } from "react";

import { FilterGroupKey, FilterSelections } from "../filters";

export default function useProductFiltersHook() {
  // 1. States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeGroupKey, setActiveGroupKey] = useState<FilterGroupKey | null>(null);
  const [selections, setSelections] = useState<FilterSelections>({});

  // 2. Funções de API — N/A

  // 3. useEffect — N/A

  // 4. Handlers
  function handleOpenFilter() {
    setIsFilterOpen(true);
  }

  function handleCloseFilter() {
    setIsFilterOpen(false);
    setActiveGroupKey(null);
  }

  function handleOpenGroup(groupKey: FilterGroupKey) {
    setActiveGroupKey(groupKey);
  }

  function handleCloseGroup() {
    setActiveGroupKey(null);
  }

  function handleToggleOption(groupKey: string, option: string) {
    const current = selections[groupKey] ?? [];
    const next = current.includes(option)
      ? current.filter((value) => value !== option)
      : [...current, option];
    setSelections({ ...selections, [groupKey]: next });
  }

  function handleClearFilters() {
    setSelections({});
  }

  // 5. return — só o que o componente consome, nunca o setter
  return {
    isFilterOpen,
    activeGroupKey,
    selections,
    handleOpenFilter,
    handleCloseFilter,
    handleOpenGroup,
    handleCloseGroup,
    handleToggleOption,
    handleClearFilters,
  };
}
