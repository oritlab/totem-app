export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calculateDiscountPercent(price: number, listPrice?: number): number {
  if (!listPrice || listPrice <= price) return 0;
  return Math.round((1 - price / listPrice) * 100);
}

export function calculatePriceWithDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}
