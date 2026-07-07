import { FilterBarProps, SORT_OPTION_LABELS, SortOption } from "../types";

const SORT_OPTIONS: SortOption[] = ["nome", "menor-preco", "maior-preco", "novidades"];

export default function FilterBar(props: FilterBarProps) {
  const {
    columns,
    onColumnsChange,
    sortOption,
    onSortChange,
    isSortOpen,
    sortRef,
    onToggleSort,
    onCloseSort,
    hasActiveFilters,
    onOpenFilter,
    onClearFilters,
  } = props;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4 text-sm text-zinc-700">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onOpenFilter} className="flex cursor-pointer items-center gap-2">
          Filtrar por:
        </button>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onOpenFilter} className="cursor-pointer">
          <g clipPath="url(#clip0_1_1072)">
          <path d="M14.8055 2.83268H7.68672C7.53075 2.42157 7.25494 2.06675 6.89501 1.81417C6.53509 1.56159 6.10762 1.42288 5.66797 1.41602C5.23197 1.42015 4.80781 1.55831 4.45301 1.81174C4.09821 2.06516 3.82995 2.4216 3.68463 2.83268H2.19714C2.09944 2.82792 2.00176 2.84247 1.9097 2.87551C1.81763 2.90855 1.73299 2.95942 1.66062 3.02522C1.58824 3.09102 1.52955 3.17044 1.48792 3.25895C1.44628 3.34746 1.42251 3.44331 1.41797 3.54102C1.42251 3.63872 1.44628 3.73457 1.48792 3.82308C1.52955 3.91159 1.58824 3.99102 1.66062 4.05681C1.73299 4.12261 1.81763 4.17348 1.9097 4.20652C2.00176 4.23956 2.09944 4.25411 2.19714 4.24935H3.68463C3.82995 4.66043 4.09821 5.01687 4.45301 5.27029C4.80781 5.52372 5.23197 5.66188 5.66797 5.66602C6.10762 5.65915 6.53509 5.52044 6.89501 5.26786C7.25494 5.01528 7.53075 4.66046 7.68672 4.24935H14.8055C14.9032 4.25411 15.0008 4.23956 15.0929 4.20652C15.185 4.17348 15.2696 4.12261 15.342 4.05681C15.4144 3.99102 15.473 3.91159 15.5147 3.82308C15.5563 3.73457 15.5801 3.63872 15.5846 3.54102C15.5801 3.44331 15.5563 3.34746 15.5147 3.25895C15.473 3.17044 15.4144 3.09102 15.342 3.02522C15.2696 2.95942 15.185 2.90855 15.0929 2.87551C15.0008 2.84247 14.9032 2.82792 14.8055 2.83268ZM5.66797 4.24935C5.52787 4.24935 5.39092 4.20781 5.27444 4.12997C5.15795 4.05214 5.06717 3.94151 5.01355 3.81208C4.95994 3.68265 4.94591 3.54023 4.97325 3.40283C5.00058 3.26542 5.06804 3.13921 5.1671 3.04015C5.26616 2.94109 5.39238 2.87362 5.52978 2.84629C5.66718 2.81896 5.80961 2.83299 5.93904 2.8866C6.06847 2.94021 6.17909 3.031 6.25693 3.14749C6.33476 3.26397 6.3763 3.40092 6.3763 3.54102C6.3763 3.72888 6.30167 3.90904 6.16884 4.04188C6.036 4.17472 5.85583 4.24935 5.66797 4.24935Z" fill="black"/>
          <path d="M14.8049 7.79167H13.3529C13.1969 7.38055 12.9211 7.02573 12.5612 6.77315C12.2012 6.52057 11.7738 6.38187 11.3341 6.375C10.8981 6.37914 10.474 6.51729 10.1192 6.77072C9.76435 7.02415 9.4961 7.38058 9.35078 7.79167H2.19661C2.00875 7.79167 1.82859 7.86629 1.69575 7.99913C1.56291 8.13197 1.48828 8.31214 1.48828 8.5C1.48828 8.68786 1.56291 8.86803 1.69575 9.00087C1.82859 9.13371 2.00875 9.20833 2.19661 9.20833H9.35078C9.4961 9.61942 9.76435 9.97585 10.1192 10.2293C10.474 10.4827 10.8981 10.6209 11.3341 10.625C11.7738 10.6181 12.2012 10.4794 12.5612 10.2268C12.9211 9.97427 13.1969 9.61945 13.3529 9.20833H14.8049C14.9928 9.20833 15.173 9.13371 15.3058 9.00087C15.4387 8.86803 15.5133 8.68786 15.5133 8.5C15.5133 8.31214 15.4387 8.13197 15.3058 7.99913C15.173 7.86629 14.9928 7.79167 14.8049 7.79167ZM11.3341 9.20833C11.194 9.20833 11.0571 9.16679 10.9406 9.08896C10.8241 9.01112 10.7333 8.9005 10.6797 8.77107C10.6261 8.64164 10.6121 8.49921 10.6394 8.36181C10.6667 8.22441 10.7342 8.09819 10.8332 7.99913C10.9323 7.90007 11.0585 7.83261 11.1959 7.80528C11.3333 7.77795 11.4757 7.79197 11.6052 7.84559C11.7346 7.8992 11.8452 7.98999 11.9231 8.10647C12.0009 8.22296 12.0424 8.3599 12.0424 8.5C12.0424 8.68786 11.9678 8.86803 11.835 9.00087C11.7021 9.13371 11.522 9.20833 11.3341 9.20833Z" fill="black"/>
          <path d="M14.8049 12.7487H8.7487C8.59273 12.3376 8.31692 11.9828 7.95699 11.7302C7.59707 11.4776 7.1696 11.3389 6.72995 11.332C6.29395 11.3362 5.86979 11.4743 5.51499 11.7278C5.16019 11.9812 4.89193 12.3376 4.74661 12.7487H2.19661C2.00875 12.7487 1.82859 12.8233 1.69575 12.9562C1.56291 13.089 1.48828 13.2692 1.48828 13.457C1.48828 13.6449 1.56291 13.8251 1.69575 13.9579C1.82859 14.0907 2.00875 14.1654 2.19661 14.1654H4.74661C4.89193 14.5764 5.16019 14.9329 5.51499 15.1863C5.86979 15.4397 6.29395 15.5779 6.72995 15.582C7.1696 15.5752 7.59707 15.4365 7.95699 15.1839C8.31692 14.9313 8.59273 14.5765 8.7487 14.1654H14.8049C14.9928 14.1654 15.173 14.0907 15.3058 13.9579C15.4387 13.8251 15.5133 13.6449 15.5133 13.457C15.5133 13.2692 15.4387 13.089 15.3058 12.9562C15.173 12.8233 14.9928 12.7487 14.8049 12.7487ZM6.72995 14.1654C6.58985 14.1654 6.4529 14.1238 6.33642 14.046C6.21993 13.9682 6.12915 13.8575 6.07553 13.7281C6.02192 13.5987 6.00789 13.4562 6.03522 13.3188C6.06256 13.1814 6.13002 13.0552 6.22908 12.9562C6.32814 12.8571 6.45436 12.7896 6.59176 12.7623C6.72916 12.735 6.87158 12.749 7.00102 12.8026C7.13045 12.8562 7.24107 12.947 7.31891 13.0635C7.39674 13.18 7.43828 13.3169 7.43828 13.457C7.43828 13.6449 7.36365 13.8251 7.23082 13.9579C7.09798 14.0907 6.91781 14.1654 6.72995 14.1654Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0_1_1072">
          <rect width="17" height="17" fill="white"/>
          </clipPath>
          </defs>
        </svg>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex cursor-pointer items-center gap-1.5 text-orange-600"
          >
            Limpar filtro
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="7" fill="currentColor" />
              <path
                d="M4.8 4.8l4.4 4.4M9.2 4.8l-4.4 4.4"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={onToggleSort}
            aria-expanded={isSortOpen}
            className="flex cursor-pointer items-center gap-1.5"
          >
            {sortOption ? SORT_OPTION_LABELS[sortOption] : "Ordenar"}
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.29688 7.89844L10.4969 12.0984L14.6969 7.89844" stroke="#6B7280" strokeWidth="1.575" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {isSortOpen && (
            <ul className="absolute right-0 top-full z-20 mt-2 w-40 border border-zinc-200 bg-white py-1 shadow-md">
              {sortOption && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSortChange(null);
                      onCloseSort();
                    }}
                    className="block w-full cursor-pointer px-4 py-2 text-left text-orange-600 hover:bg-zinc-50"
                  >
                    Nenhum
                  </button>
                </li>
              )}
              {SORT_OPTIONS.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onSortChange(option);
                      onCloseSort();
                    }}
                    className={`block w-full cursor-pointer px-4 py-2 text-left hover:bg-zinc-50 ${
                      sortOption === option ? "font-medium text-zinc-900" : "text-zinc-600"
                    }`}
                  >
                    {SORT_OPTION_LABELS[option]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center">
          <button
            type="button"
            aria-label="Exibir 3 colunas"
            aria-pressed={columns === 3}
            onClick={() => onColumnsChange(3)}
            className={`cursor-pointer ${columns === 3 ? "text-black" : "text-zinc-400"}`}
          >
            <svg width="49" height="18" viewBox="0 0 49 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.07853 0.5H2.28906V17.5H7.07853V0.5Z" stroke="currentColor"/>
              <path d="M15.7895 0.5H11V17.5H15.7895V0.5Z" stroke="currentColor"/>
              <path d="M23.7895 0.5H19V17.5H23.7895V0.5Z" stroke="currentColor"/>
            </svg>
          </button>

          <button
            type="button"
            aria-label="Exibir 4 colunas"
            aria-pressed={columns === 4}
            onClick={() => onColumnsChange(4)}
            className={`cursor-pointer ${columns === 4 ? "text-black" : "text-zinc-400"}`}
          >
            <svg width="49" height="18" viewBox="0 0 49 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.7895 0.5H27V17.5H31.7895V0.5Z" stroke="currentColor"/>
              <path d="M7.07853 0.5H2.28906V17.5H7.07853V0.5Z" stroke="currentColor"/>
              <path d="M15.7895 0.5H11V17.5H15.7895V0.5Z" stroke="currentColor"/>
              <path d="M23.7895 0.5H19V17.5H23.7895V0.5Z" stroke="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
