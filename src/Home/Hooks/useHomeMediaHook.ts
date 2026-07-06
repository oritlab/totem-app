import { ApiConfig } from "../../configurations/ApiConfig";

export default function useHomeMediaHook() {
  const bannerVideo = ApiConfig.Router.TotemVideo("home_desktop-2026");
  const imageSale = ApiConfig.Router.TotemImage("orit-promocao");
  const imageWatch = ApiConfig.Router.TotemImage("orit-relogios");
  const imageNews = ApiConfig.Router.TotemImage("orit-novidades");
  const imageVintage = ApiConfig.Router.TotemImage("orit-vintage");
  const imageDiamond = ApiConfig.Router.TotemImage("orit-diamantes");
  const imageMarcas = ApiConfig.Router.TotemImage("orit-marcas-iconicas");
  const image360 = ApiConfig.Router.TotemImage("orit-360");
  const imageRing = ApiConfig.Router.TotemImage("orit-aneis");
  const imageBrinco = ApiConfig.Router.TotemImage("orit-brincos");
  const imageColar = ApiConfig.Router.TotemImage("orit-colares");
  const imagePingente = ApiConfig.Router.TotemImage("orit-pingentes");
  const imagePulseira = ApiConfig.Router.TotemImage("orit-pulseiras");
  const imageBuy = ApiConfig.Router.TotemImage("orit-Compramos-joias");

  return {
    bannerVideo,
    imageSale,
    imageWatch,
    imageNews,
    imageVintage,
    imageDiamond,
    imageMarcas,
    image360,
    imageRing,
    imageBrinco,
    imageColar,
    imagePingente,
    imagePulseira,
    imageBuy,
  };
}
