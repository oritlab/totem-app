import { useState } from "react";

import { countTotalSelections } from "../filters";
import { FilterGroupKey, FilterSelections } from "../types";

export default function useProductFiltersHook() {
  // 1. States
  const [filterState, setFilterState] = useState({
    isOpen: false,
    activeGroupKey: null as FilterGroupKey | null,
    selections: {} as FilterSelections,
  });

  // 2. Funções de API — N/A

  // 3. useEffect — N/A

  const totalSelectedCount = countTotalSelections(filterState.selections);

  // 4. Handlers
  function handleFilter(action: "open" | "close") {
    if (action === "open") setFilterState({ ...filterState, isOpen: true });
    if (action === "close") setFilterState({ ...filterState, isOpen: false, activeGroupKey: null });
  }

  function handleGroup(action: "open" | "close", groupKey?: FilterGroupKey) {
    if (action === "open" && groupKey) setFilterState({ ...filterState, activeGroupKey: groupKey });
    if (action === "close") setFilterState({ ...filterState, activeGroupKey: null });
  }

  function handleToggleOption(groupKey: string, option: string) {
    const current = filterState.selections[groupKey] ?? [];
    const next = current.includes(option)
      ? current.filter((value) => value !== option)
      : [...current, option];
    setFilterState({ ...filterState, selections: { ...filterState.selections, [groupKey]: next } });
  }

  function handleClearFilters() {
    setFilterState({ ...filterState, selections: {} });
  }

  // 5. return — só o que o componente consome, nunca o setter
  return {
    isFilterOpen: filterState.isOpen,
    activeGroupKey: filterState.activeGroupKey,
    selections: filterState.selections,
    totalSelectedCount,
    handleFilter,
    handleGroup,
    handleToggleOption,
    handleClearFilters,
  };
}
