// Tipos usados por mais de uma página. Cada página importa daqui e
// re-exporta junto dos próprios tipos no seu types.ts — nunca se importa
// direto de global.tsx fora daqui.

export type MenuState = {
  open: boolean;
};

export type RequestStatus = {
  loading: boolean;
  error: string | null;
};

export type HeaderProps = {
  // "light" (padrão) = logo/hambúrguer brancos, pra ficar sobre fundo escuro.
  // "dark" = logo/hambúrguer escuros, pra ficar sobre fundo claro (ex:
  // banner "split" da Listagem — ver Produtos/Listagem/Components/HeroBanner.tsx).
  theme?: "light" | "dark";
  handleModal: (action: string) => void;
};

export type MenuDrawerProps = {
  modalMenu: MenuState;
  handleModal: (action: string) => void;
};

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  total: number;
};

// Vocabulário de ordenação do backend (ProductsRepository, totem-api) —
// diferente de propósito do SortOption de UI de cada página.
export type ProductSortOption = "recentes" | "maior_preco" | "menor_preco" | "a_a_z";

// Payload de GET /products/availability/stream (event: availability)
// consumido pela Detalhe (modal) e pela Listagem (refresh da lista).
export type AvailabilityEvent = {
  productId: number;
  sku: string;
  available: boolean;
};
