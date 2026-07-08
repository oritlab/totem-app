import { Product } from "./types";

// Amostra real de produtos já sincronizados no totem-catalog-api (nome, marca,
// preço e imagem real do CDN da Orit) — usada só até a integração com o
// backend estar pronta. `listPrice` em 3 itens é um valor de demonstração
// (não reflete desconto real na Wake) só pra exercitar o card de promoção.
// `categories` são os slugs de categories.ts — um produto pode estar em
// mais de uma. Nosso mock não cobre todas as 10 categorias (não temos
// pingente/pulseira à mão); isso é uma limitação conhecida do mock, não bug.
export const mockProducts: Product[] = [
  {
    sku: "1097404",
    name: "Relógio Rolex Daytona rosé",
    brand: "Rolex",
    price: 424990,
    categories: ["relogios", "marcas-iconicas"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417601/relogio-rolex-daytona-rose-216229/417601-1.jpg?w=500&h=500",
  },
  {
    sku: "1075702",
    name: "Relógio Audemars Piguet Royal OAK OffShore",
    brand: "Audemars Piguet",
    price: 224990,
    categories: ["relogios", "marcas-iconicas"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/416303/relogio-audemars-piguet-royal-oak-offshore-214934/416303.jpg?w=500&h=500",
    // mock só tem 1 imagem real pra esse SKU — repetida pra exercitar o
    // carrossel de mais de 3 itens na página de detalhe (ver Detalhe/useProdutoHook.ts)
    images: [
      "https://orit.fbitsstatic.net/img/p/416303/relogio-audemars-piguet-royal-oak-offshore-214934/416303.jpg?w=500&h=500",
      "https://orit.fbitsstatic.net/img/p/416303/relogio-audemars-piguet-royal-oak-offshore-214934/416303.jpg?w=500&h=500",
      "https://orit.fbitsstatic.net/img/p/416303/relogio-audemars-piguet-royal-oak-offshore-214934/416303.jpg?w=500&h=500",
      "https://orit.fbitsstatic.net/img/p/416303/relogio-audemars-piguet-royal-oak-offshore-214934/416303.jpg?w=500&h=500",
    ],
  },
  {
    sku: "1062883",
    name: "Colar cachecol de malha Elsa Peretti em ouro amarelo",
    brand: "Tiffany & Co",
    price: 220990,
    categories: ["colares", "marcas-iconicas"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/414782/colar-mesh-de-elsa-peretti-tiffany-e-co-em-ouro-amarelo-213433/414782.jpg?w=500&h=500",
  },
  {
    sku: "1058501",
    name: "Relógio Breguet Classique Complications",
    brand: "Breguet",
    price: 199990,
    listPrice: 229990, // demonstração
    categories: ["relogios"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/413146/relogio-breguet-classique-complications-211813/413146.jpg?w=500&h=500",
  },
  {
    sku: "1072137",
    name: "Colar riviera com 16 ct de diamantes em ouro branco",
    brand: "Sem Marca",
    price: 179990,
    categories: ["colares", "diamantes"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417548/colar-riviera-com-16-ct-de-diamantes-em-ouro-branco-216176/417548-1.jpg?w=500&h=500",
  },
  {
    sku: "1095859",
    name: "Relógio Longines Charles Lindbergh Hour Angle",
    brand: "Longines",
    price: 179990,
    listPrice: 199990, // demonstração
    categories: ["relogios", "vintage"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417842/relogio-longines-charles-lindbergh-hour-angle-216470/417842-1.jpg?w=500&h=500",
  },
  {
    sku: "1064465",
    name: "Relógio Rolex Cellini Prince",
    brand: "Rolex",
    price: 179990,
    categories: ["relogios", "vintage"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/414500/relogio-rolex-cellini-prince-213153/414500.jpg?w=500&h=500",
  },
  {
    sku: "1070781",
    name: "Colar riviera com 11,20 ct de diamantes em ouro branco",
    brand: "Sem Marca",
    price: 159990,
    categories: ["colares", "diamantes"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/416590/colar-riviera-com-11-20-ct-de-diamantes-em-ouro-branco-215219/416590.jpg?w=500&h=500",
  },
  {
    sku: "1059342",
    name: "Relógio Cartier Tank Américaine",
    brand: "Cartier",
    price: 159990,
    listPrice: 179990, // demonstração
    categories: ["relogios", "marcas-iconicas"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417994/relogio-cartier-tank-americaine-216622/417994-1.jpg?w=500&h=500",
  },
  {
    sku: "1075467",
    name: "Aliança em Platina com Diamantes Tiffany & Co",
    brand: "Tiffany & Co",
    price: 153990,
    categories: ["aneis", "diamantes"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417833/alianca-em-platina-com-diamantes-tiffany-e-co-216461/417833-1.jpg?w=500&h=500",
  },
  {
    sku: "1068455",
    name: "Relógio Tiffany & Co Atlas",
    brand: "Tiffany & Co",
    price: 149990,
    categories: ["relogios", "marcas-iconicas"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/415203/relogio-tiffany-e-co-atlas-213844/415203.jpg?w=500&h=500",
  },
  {
    sku: "1070780",
    name: "Brinco solitário com 2,01 ct de diamantes em ouro branco",
    brand: "Sem Marca",
    price: 149590,
    categories: ["brincos", "diamantes"],
    imageUrl:
      "https://orit.fbitsstatic.net/img/p/417372/brinco-solitario-com-2-02-ct-de-diamantes-em-ouro-branco-216000/417372-6.jpg?w=500&h=500",
  },
];
