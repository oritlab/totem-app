export type ProdutoImage = {
  src: string;
  alt: string;
};

export type AccordionItemData = {
  title: string;
  content: string;
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
  images: ProdutoImage[];
  accordionItems: AccordionItemData[];
};

export type TopBarProps = {
  category: string;
  backHref: string;
};

export type ImageCarouselProps = {
  images: ProdutoImage[];
};

export type DragState = {
  dragging: boolean;
  startX: number;
  offset: number;
};

export type ProductInfoProps = {
  reference: string;
  badge?: string;
  promotionBadge?: string;
  brand: string;
  title: string;
  originalPrice?: string;
  price: string;
  installment: string;
  pixPrice: string;
};

export type AccordionState = {
  openIndex: number | null;
};

export type AccordionSectionProps = {
  items: AccordionItemData[];
  openIndex: number | null;
  handleToggle: (index: number) => void;
};
