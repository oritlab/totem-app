import { AttributeFilterKey, CategoryFiltersResponse, FilterGroup, FilterSelections } from "./types";


const ATTRIBUTE_LABELS: Record<AttributeFilterKey, string> = {
  gender: "Gênero",
  watchboxShape: "Formato da Caixa",
  watchboxMaterial: "Material da Caixa",
  watchboxSize: "Tamanho da Caixa",
  watchbandSize: "Medida da Pulseira",
  metal: "Metal",
  gems: "Pedras",
  carat: "Quilate",
  ringSize: "Aro",
  ringSizeAdjustment: "Ajuste de Aro",
  size: "Tamanho",
};

export function buildFilterGroups(response: CategoryFiltersResponse | null): FilterGroup[] {
  if (!response) return [];

  const groups: FilterGroup[] = [];

  if (response.brands.length > 0) {
    groups.push({
      key: "marcas",
      label: "Marcas",
      options: response.brands.map((brand) => brand.name),
    });
  }

  response.attributes.forEach((attribute) => {
    if (attribute.values.length === 0) return;
    groups.push({
      key: attribute.key,
      label: ATTRIBUTE_LABELS[attribute.key],
      options: attribute.values,
    });
  });

  if (response.price.length > 0) {
    groups.push({
      key: "faixa-preco",
      label: "Faixa de Preço",
      options: response.price.map((bucket) => bucket.label),
    });
  }

  return groups;
}

// Faixa de preço é seleção única (o backend só aceita um par
// priceMin/priceMax por request) — as demais chaves são multi-seleção.
export function buildFilterQueryParams(
  selections: FilterSelections,
  response: CategoryFiltersResponse | null
): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  if (!response) return params;

  Object.entries(selections).forEach(([key, values]) => {
    if (key === "marcas" || key === "faixa-preco" || !values.length) return;
    params[key] = values;
  });

  const brandNames = selections.marcas;
  if (brandNames?.length) {
    const brandIds = brandNames
      .map((name) => response.brands.find((brand) => brand.name === name)?.id)
      .filter((id): id is number => id !== undefined)
      .map(String);
    if (brandIds.length) params.brandIds = brandIds;
  }

  const priceLabel = selections["faixa-preco"]?.[0];
  const bucket = priceLabel ? response.price.find((item) => item.label === priceLabel) : undefined;
  if (bucket?.min != null) params.priceMin = String(bucket.min);
  if (bucket?.max != null) params.priceMax = String(bucket.max);

  return params;
}

export function countTotalSelections(selections: FilterSelections): number {
  return Object.values(selections).reduce((total, options) => total + options.length, 0);
}
