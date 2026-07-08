import { LoadMoreProps } from "../types";

export default function LoadMore(props: LoadMoreProps) {
  const { shown, total, onLoadMore } = props;
  const hasMore = shown < total;

  return (
    <div className="flex flex-col items-center gap-3 pb-12">
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="cursor-pointer border rounded-sm border-zinc-900 px-8 py-2 text-sm text-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          Ver mais
        </button>
      )}
      <span className="text-xs text-zinc-500">
        1–{shown} de {total} produtos
      </span>
    </div>
  );
}
