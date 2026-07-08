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
