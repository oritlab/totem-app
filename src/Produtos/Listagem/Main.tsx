"use client";

import MenuDrawer from "@/src/global/components/MenuDrawer";
import useMenuHook from "@/src/Home/Hooks/useMenuHook";

import FilterBar from "./Components/FilterBar";
import FilterDrawer from "./Components/FilterDrawer";
import FilterOptionsDrawer from "./Components/FilterOptionsDrawer";
import HeroBanner from "./Components/HeroBanner";
import LoadMore from "./Components/LoadMore";
import ProductGrid from "./Components/ProductGrid";
import useProductFiltersHook from "./Hooks/useProductFiltersHook";
import useProductsListHook from "./Hooks/useProductsListHook";
import useSortDropdownHook from "./Hooks/useSortDropdownHook";
import { MainProps } from "./types";

// Quem renderiza este componente precisa passar key={category?.slug} —
// é isso que faz o React remontar o hook (e reiniciar paginação/colunas/
// ordenação) ao trocar de categoria, em vez de um useEffect chamando setState.
export default function Main(props: MainProps) {
  const { category } = props;

  const {
    isFilterOpen,
    activeGroupKey,
    selections,
    totalSelectedCount,
    handleFilter,
    handleGroup,
    handleToggleOption,
    handleClearFilters,
  } = useProductFiltersHook();

  const {
    banner,
    visibleProducts,
    totalCount,
    columns,
    sortOption,
    filterGroups,
    activeGroup,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
  } = useProductsListHook(category, selections, activeGroupKey);

  const { isOpen: isSortOpen, dropdownRef: sortRef, handleToggle: handleToggleSort, handleClose: handleCloseSort } =
    useSortDropdownHook();

  const { modalMenu, handleModal } = useMenuHook();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MenuDrawer modalMenu={modalMenu} handleModal={handleModal} />

      <HeroBanner banner={banner} handleModal={handleModal} />

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
        onOpenFilter={() => handleFilter("open")}
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
          <div className="absolute inset-0 bg-black/40" onClick={() => handleFilter("close")} />

          {/* Máscara de recorte compartilhada pelos dois drawers — a borda
              vive aqui, não em cada painel. O overflow-hidden recorta o
              conjunto (FilterDrawer + FilterOptionsDrawer). */}
          <div className="relative flex overflow-hidden border border-zinc-200">
            <FilterDrawer
              isOpen={isFilterOpen}
              filterGroups={filterGroups}
              selections={selections}
              activeGroupKey={activeGroupKey}
              totalSelectedCount={totalSelectedCount}
              sortOption={sortOption}
              onClose={() => handleFilter("close")}
              onOpenGroup={(groupKey) => handleGroup("open", groupKey)}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />
            <FilterOptionsDrawer
              group={activeGroup}
              selectedOptions={activeGroupKey ? selections[activeGroupKey] ?? [] : []}
              onClose={() => handleGroup("close")}
              onToggleOption={(option) => activeGroupKey && handleToggleOption(activeGroupKey, option)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
