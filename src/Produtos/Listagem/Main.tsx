"use client";

import MenuDrawer from "@/src/Home/Components/MenuDrawer";
import useMenuHook from "@/src/Home/Hooks/useMenuHook";

import FilterBar from "./Components/FilterBar";
import FilterDrawer from "./Components/FilterDrawer";
import FilterOptionsDrawer from "./Components/FilterOptionsDrawer";
import HeroBanner from "./Components/HeroBanner";
import LoadMore from "./Components/LoadMore";
import ProductGrid from "./Components/ProductGrid";
import { countTotalSelections, getFilterGroupsForCategory } from "./filters";
import useProductFiltersHook from "./Hooks/useProductFiltersHook";
import useProductsListHook from "./Hooks/useProductsListHook";
import useSortDropdownHook from "./Hooks/useSortDropdownHook";
import { Category, CategoryBanner } from "./types";

const DEFAULT_BANNER: CategoryBanner = {
  title: "Catálogo",
  subtitle: "",
  variant: "cover",
  align: "right",
};

type MainProps = {
  category?: Category;
};

// Quem renderiza este componente precisa passar key={category?.slug} —
// é isso que faz o React remontar o hook (e reiniciar paginação/colunas/
// ordenação) ao trocar de categoria, em vez de um useEffect chamando setState.
export default function Main(props: MainProps) {
  const { category } = props;

  const {
    isFilterOpen,
    activeGroupKey,
    selections,
    handleOpenFilter,
    handleCloseFilter,
    handleOpenGroup,
    handleCloseGroup,
    handleToggleOption,
    handleClearFilters,
  } = useProductFiltersHook();

  const {
    categoryProducts,
    visibleProducts,
    totalCount,
    columns,
    sortOption,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
  } = useProductsListHook(category, selections);

  const { isOpen: isSortOpen, dropdownRef: sortRef, handleToggle: handleToggleSort, handleClose: handleCloseSort } =
    useSortDropdownHook();

  const { modalMenu, handleModal } = useMenuHook();

  const filterGroups = getFilterGroupsForCategory(category?.slug, categoryProducts);
  const totalSelectedCount = countTotalSelections(selections);
  const activeGroup = filterGroups.find((group) => group.key === activeGroupKey) ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MenuDrawer modalMenu={modalMenu} handleModal={handleModal} />

      <HeroBanner {...(category?.banner ?? DEFAULT_BANNER)} handleModal={handleModal} />

      <FilterBar
        columns={columns}
        onColumnsChange={handleColumnsChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        isSortOpen={isSortOpen}
        sortRef={sortRef}
        onToggleSort={handleToggleSort}
        onCloseSort={handleCloseSort}
        hasActiveFilters={totalSelectedCount > 0}
        onOpenFilter={handleOpenFilter}
        onClearFilters={handleClearFilters}
      />
      <ProductGrid products={visibleProducts} columns={columns} />
      <LoadMore
        shown={visibleProducts.length}
        total={totalCount}
        onLoadMore={handleLoadMore}
      />

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={handleCloseFilter} />

          {/* Máscara de recorte compartilhada pelos dois drawers — a borda
              e o canto arredondado vivem aqui, não em cada painel. O
              overflow-hidden recorta o conjunto (FilterDrawer +
              FilterOptionsDrawer) na forma arredondada, revelando o que
              está atrás (o overlay escuro) só naquele canto — sem costura
              dupla no meio nem "branco sobre branco" invisível. */}
          <div className="relative flex overflow-hidden rounded-br-[20px] border border-zinc-200 sm:rounded-br-[30px]">
            <FilterDrawer
              isOpen={isFilterOpen}
              filterGroups={filterGroups}
              selections={selections}
              activeGroupKey={activeGroupKey}
              totalSelectedCount={totalSelectedCount}
              sortOption={sortOption}
              onClose={handleCloseFilter}
              onOpenGroup={handleOpenGroup}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />
            <FilterOptionsDrawer
              group={activeGroup}
              selectedOptions={activeGroupKey ? selections[activeGroupKey] ?? [] : []}
              onClose={handleCloseGroup}
              onToggleOption={(option) => activeGroupKey && handleToggleOption(activeGroupKey, option)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
