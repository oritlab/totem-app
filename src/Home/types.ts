export type MenuState = {
  open: boolean;
};

export type HeroProps = {
  videoSrc: string;
  handleModal: (action: string) => void;
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

export type TileProps = {
  label: string;
  imageSrc: string;
  href: string;
  subtitle?: string;
  labelClassName?: string;
};

export type PromoBannerProps = {
  imageSrc: string;
  // imageOpacityClassName: string;
  title: string;
  subtitle: string;
  titleClassName: string;
};
