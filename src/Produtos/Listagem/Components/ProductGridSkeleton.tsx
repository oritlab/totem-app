import { GridColumns } from "../types";

// Placeholder de loading pro primeiro carregamento da listagem — sem
// Skeleton do Shadcn (ainda não existe neste projeto, ver
// Context/Checklist-Arquitetura.md), então usa animate-pulse do Tailwind
// direto, imitando a mesma silhueta/grid do ProductCard/ProductGrid.
const COLUMNS_CLASS: Record<GridColumns, string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const PLACEHOLDER_COUNT = 8;

export type ProductGridSkeletonProps = {
  columns: GridColumns;
};

export default function ProductGridSkeleton(props: ProductGridSkeletonProps) {
  const { columns } = props;

  return (
    <div className={`grid gap-x-6 gap-y-10 px-6 py-8 ${COLUMNS_CLASS[columns]}`}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col gap-2">
          <div className="aspect-square w-full bg-zinc-200" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-1/2 bg-zinc-200" />
            <div className="h-4 w-3/4 bg-zinc-200" />
            <div className="h-4 w-1/3 bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
