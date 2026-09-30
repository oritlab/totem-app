"use client";

import { ProductTagCampaigns } from "@/src/configurations/Campaign/ProductTagCampaigns";
import useCampaignAccessHook from "@/src/global/hooks/useCampaignAccessHook";
import { ProductTags } from "@/src/global/types/global";
import { getProductTag } from "@/src/global/utils/campaign";

// Resolve a tag de campanha de cada produto (listagem e detalhe).
// categorySlugs: categorias em que os produtos estão (listagem = a categoria
// da rota; detalhe = as categorias do produto). Antes de ler o acesso no
// cliente, nenhum produto tem tag.
export default function useProductTagsHook(products: { sku: string }[], categorySlugs: (string | undefined)[]) {
  const campaignAccess = useCampaignAccessHook();
  const productTags: ProductTags = {};

  if (!campaignAccess.ready) return { productTags };

  const knownCategorySlugs = categorySlugs.filter(function (categorySlug): categorySlug is string {
    return !!categorySlug;
  });

  products.forEach(function (product) {
    productTags[product.sku] = getProductTag(
      ProductTagCampaigns,
      product.sku,
      knownCategorySlugs,
      campaignAccess
    );
  });

  return { productTags };
}
