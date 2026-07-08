import { HeaderProps, MenuDrawerProps, MenuState } from "../global/types/global";

export type { HeaderProps, MenuDrawerProps, MenuState };

export type HeroProps = {
  videoSrc: string;
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
