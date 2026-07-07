"use client";

import useMenuDrawerHook from "@/src/shared/Hooks/useMenuDrawerHook";

import FilterBar from "./Components/FilterBar";
import HeroBanner from "./Components/HeroBanner";
import LoadMore from "./Components/LoadMore";
import ProductGrid from "./Components/ProductGrid";
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
    visibleProducts,
    totalCount,
    columns,
    sortOption,
    handleColumnsChange,
    handleSortChange,
    handleLoadMore,
  } = useProductsListHook(category);

  const { isOpen: isSortOpen, dropdownRef: sortRef, handleToggle: handleToggleSort, handleClose: handleCloseSort } =
    useSortDropdownHook();

  const { isMenuOpen, menuRef, handleOpenMenu, handleCloseMenu } = useMenuDrawerHook();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeroBanner
        {...(category?.banner ?? DEFAULT_BANNER)}
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        onOpenMenu={handleOpenMenu}
        onCloseMenu={handleCloseMenu}
      />

      <FilterBar
        columns={columns}
        onColumnsChange={handleColumnsChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        isSortOpen={isSortOpen}
        sortRef={sortRef}
        onToggleSort={handleToggleSort}
        onCloseSort={handleCloseSort}
      />
      <ProductGrid products={visibleProducts} columns={columns} />
      <LoadMore
        shown={visibleProducts.length}
        total={totalCount}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
