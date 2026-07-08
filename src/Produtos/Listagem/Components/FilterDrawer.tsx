import { FilterDrawerProps, SORT_OPTION_LABELS, SortOption } from "../types";

const SORT_ORDER: SortOption[] = ["novidades", "maior-preco", "menor-preco", "nome"];

export default function FilterDrawer(props: FilterDrawerProps) {
  const {
    isOpen,
    filterGroups,
    selections,
    activeGroupKey,
    totalSelectedCount,
    sortOption,
    onClose,
    onOpenGroup,
    onSortChange,
    onClearFilters,
  } = props;

  if (!isOpen) return null;

  return (
    <div className="relative flex h-full w-[85vw] max-w-90 flex-col overflow-y-auto border-r border-b border-zinc-200 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
        <span className="text-sm tracking-widest text-zinc-800">Filtrar e Ordenar</span>
        <button type="button" aria-label="Fechar filtros" onClick={onClose} className="cursor-pointer text-xl">
          ×
        </button>
      </div>

      <div className="border-b border-zinc-200 px-6 py-4">
        <span className="block pb-2 text-xl text-zinc-800">Organizar por:</span>
        <div className="flex flex-wrap gap-3 text-xs">
          {SORT_ORDER.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSortChange(option)}
              className={`cursor-pointer ${
                sortOption === option ? "font-semibold text-zinc-900" : "text-zinc-500"
              }`}
            >
              {SORT_OPTION_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-1 flex-col">
        {filterGroups.map((group) => {
          const selectedCount = selections[group.key]?.length ?? 0;
          const isActive = group.key === activeGroupKey;

          return (
            <li key={group.key} className="border-b border-zinc-200">
              <button
                type="button"
                onClick={() => onOpenGroup(group.key)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm text-zinc-800"
              >
                <span className={isActive ? "font-semibold" : ""}>
                  {group.label}
                  {selectedCount > 0 && ` (${selectedCount})`}
                </span>
                {!isActive && <span aria-hidden="true">›</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 border-t border-zinc-200 px-6 py-4">
        <button
          type="button"
          onClick={onClearFilters}
          className="flex-1 cursor-pointer border border-zinc-900 px-4 py-3 text-xs tracking-wide text-zinc-900"
        >
          LIMPAR FILTRO({totalSelectedCount})
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer bg-black px-4 py-3 text-xs tracking-wide text-white"
        >
          APLICAR
        </button>
      </div>
    </div>
  );
}
