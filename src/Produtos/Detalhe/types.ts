import { AvailabilityEvent, RequestStatus } from "@/src/global/types/global";
export type { AvailabilityEvent, RequestStatus };

export type ProdutoImage = {
  src: string;
  alt: string;
};

export type AccordionItemData = {
  title: string;
  content: string;
  images?: string[];
};

export type ProdutoData = {
  reference: string;
  badge?: string;
  promotionBadge?: string;
  brand: string;
  title: string;
  category: string;
  originalPrice?: string;
  price: string;
  installment: string;
  pixPrice: string;
  pixPercent: number;
  images: ProdutoImage[];
  accordionItems: AccordionItemData[];
};

// Contrato de GET /api/v1/products/:sku (ver docs/integracao-frontend-get-products-sku.md)
export type ProductImageResponse = {
  url: string;
  order: number | null;
};

export type ProductCategoryResponse = {
  id: number;
  name: string;
};

export type ProductDetailResponse = {
  sku: string;
  brand: string | null;
  title: string;
  description: string;
  images: ProductImageResponse[];
  categories: ProductCategoryResponse[];
  listPrice: number;
  price: number;
  onSale: boolean;
  pix: { percent: number; price: number };
  installments: { count: number; amount: number };
  eligible360: boolean;
};

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  extensions: Record<string, unknown>;
};

export type TopBarProps = {
  category: string;
};

export type ImageCarouselProps = {
  images: ProdutoImage[];
};

export type CarouselItemProps = {
  media: ProdutoImage;
  priority: boolean;
};

export type DragState = {
  dragging: boolean;
  startX: number;
  offset: number;
};

export type ProductInfoProps = {
  produto: ProdutoData;
};

export type AccordionState = {
  openIndex: number | null;
};

export type AccordionSectionProps = {
  accordionItems: AccordionItemData[];
  openIndex: number | null;
  handleToggle: (index: number) => void;
};

export type MainProps = {
  sku: string;
};

export type AvailabilityModalProps = {
  open: boolean;
};
