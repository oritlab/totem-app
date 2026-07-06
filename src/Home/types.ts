export type MenuState = {
  open: boolean;
};

export type AccordionState = {
  open: boolean;
};

export type HeroProps = {
  imageSrc: string;
  modalMenu: MenuState;
  handleModal: (action: string) => void;
};

export type HeaderProps = {
  handleModal: (action: string) => void;
};

export type MenuDrawerProps = {
  modalMenu: MenuState;
  handleModal: (action: string) => void;
  accordionJoias: AccordionState;
  handleAccordion: (action: string) => void;
};

export type TileProps = {
  label: string;
  imageSrc: string;
  href: string;
  labelClassName?: string;
};

export type PromoBannerProps = {
  imageSrc: string;
  // imageOpacityClassName: string;
  title: string;
  subtitle: string;
  titleClassName: string;
};
