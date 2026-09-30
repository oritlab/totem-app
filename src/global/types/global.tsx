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

// Campanhas (ver src/configurations/Campaign/). Cada item aponta pra fases do
// CampaignSchedule: janela = início de startPhase → fim de endPhase (null = sem limite).
export type CampaignPhaseKey = "phase1" | "phase2" | "phase3" | "phase4";

export type CampaignWindow = {
  startPhase: CampaignPhaseKey | null;
  endPhase: CampaignPhaseKey | null;
};

export type CampaignAction = {
  type: "landing" | "link";
  href: string;
};

export type HomeCardCampaign = CampaignWindow & {
  id: string;
  image: string;
  alt: string;
  action: CampaignAction;
};

export type LandingCampaign = CampaignWindow & {
  id: string;
  route: string;
  formId: string;
  heroImage: string;
};

export type ProductTag = {
  text: string;
  backgroundColor: string;
  textColor: string;
};

export type ProductTagCampaign = CampaignWindow & {
  id: string;
  tag: ProductTag;
  productSkus: string[];
  categorySlugs: string[];
  homologOnly: boolean;
};

export type CategoryBannerCampaign = CampaignWindow & {
  id: string;
  categorySlug: string;
  imageUrl: string;
};

// sku → tag ativa (ausente = sem tag)
export type ProductTags = Record<string, ProductTag | undefined>;

// ready: false até ler o localStorage no cliente (no SSR/build é sempre false).
// homologGrantedAt: quando a pessoa acessou a rota de homologação (epoch ms) —
// início da linha do tempo comprimida. now: relógio da campanha (epoch ms).
export type CampaignAccess = {
  ready: boolean;
  homolog: boolean;
  homologGrantedAt: number | null;
  now: number;
};

// Payload de GET /products/availability/stream (event: availability)
// consumido pela Detalhe (modal) e pela Listagem (refresh da lista).
export type AvailabilityEvent = {
  productId: number;
  sku: string;
  available: boolean;
};
