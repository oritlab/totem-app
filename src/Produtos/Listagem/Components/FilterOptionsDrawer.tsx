import { FilterOptionsDrawerProps } from "../types";

// Painel independente do FilterDrawer — sobe/desce seu próprio estado
// (activeGroupKey), sem afetar isFilterOpen. Fica ao lado do FilterDrawer
// dentro do mesmo container branco compartilhado (ver Main.tsx) — é esse
// container, não este componente, que evita o "vácuo" escuro atrás do
// canto arredondado do FilterDrawer.
export default function FilterOptionsDrawer(props: FilterOptionsDrawerProps) {
  const { group, selectedOptions, onClose, onToggleOption } = props;

  if (!group) return null;

  return (
    <div className="relative flex h-full w-[85vw] max-w-90 flex-col overflow-y-auto border-l border-zinc-200 bg-white shadow-[inset_8px_0_16px_-4px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-end border-b border-zinc-200 px-6 py-4">
        <button type="button" aria-label="Fechar opções" onClick={onClose} className="cursor-pointer text-xl">
          ×
        </button>
      </div>

      {group.options.length === 0 ? (
        <p className="px-6 py-4 text-sm text-zinc-500">
          Nenhuma opção disponível ainda para {group.label.toLowerCase()}.
        </p>
      ) : (
        <ul className="flex flex-col overflow-y-auto">
          {group.options.map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onToggleOption(option)}
                  className={`block w-full cursor-pointer px-6 py-2 text-left text-sm ${
                    isSelected ? "font-semibold text-zinc-900" : "text-zinc-600"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
